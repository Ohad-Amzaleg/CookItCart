import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ItemTypes } from "./DragFood";
import { useDrop } from "react-dnd";
import { format, set } from "date-fns";
import "../../custom-calendar-theme.css"; // Import your custom theme CSS
import { utcToZonedTime } from "date-fns-tz";
import Schedule from "../../Classes/Schedule";
import { EventDragStopArg } from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import CartChart from "./CartChart";
import FoodItem from "../../Classes/FoodItem";
import { Typography } from "@mui/material";

interface ScheduleCompProps {
  schedule: Schedule;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  updateServings: (item: any) => void;
}

export default function ScheduleComp({
  schedule,
  updateServings,
}: ScheduleCompProps) {
  const [items, setItems] = useState(null) as any; // Initialize the events state
  const [calendar, setCalendar] = useState(null) as any;
  const [nutrients, setNutrients] = useState(null) as any;

  const fetchEvents = async () => {
    try {
      console.log("fetching schedule");
      const res = await schedule.fetchEvents();
      schedule.events = res ? res : [];
      setItems(schedule.events);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNutrients = async () => {
    try {
      const res = await schedule.fetchNutrition();
      console.log(res);
      setNutrients(res);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSchedule = async () => {
    try {
      await schedule.updateEvents(items);
    } catch (err) {
      console.log(err);
    }
  };

  const updateNutrients = async (food: FoodItem) => {
    console.log(food.servings);
    const mergedNutrients = { ...nutrients };
    // Merge new nutrients with existing nutrients based on your conditions
    for (const key in food.nutrition) {
      if (key === "updated_at") continue;

      if (mergedNutrients[key]) {
        // Decide how to combine or update the values (e.g., addition, concatenation, etc.)
        // For example, here I'm adding the values together
        mergedNutrients[key] += food.nutrition[key] / food.servings;
      } else {
        // If the key doesn't exist, just set the value
        mergedNutrients[key] = food.nutrition[key] / food.servings;
      }
    }
    try {
      await schedule.updateNutrition(mergedNutrients);
    } catch (err) {
      console.log(err);
    }
    setNutrients(mergedNutrients);
  };

  useEffect(() => {
    fetchEvents();
    fetchNutrients();
  }, []);

  useEffect(() => {
    if (!items) return;
    updateSchedule();
  }, [items]);

  const formatDateToISO = (date: Date) => {
    // Convert the input date to the desired time zone (Asia/Jerusalem)
    const zonedDate = utcToZonedTime(date, "Asia/Jerusalem");

    // Format the zoned date to ISO string
    const isoString = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");

    return isoString;
  };

  const handleEventDrop = (info: EventDragStopArg) => {
    if (!info.event) return;

    const eventId = info.event.id;
    const newStart = info.event.start;

    // Update the event in the items state
    setItems((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === eventId) {
          return {
            ...item,
            start: newStart,
          };
        } else {
          return item;
        }
      });
    });
  };

  const [, drop] = useDrop({
    accept: ItemTypes.FOOD_ITEM,
    drop: async (item: any, monitor: any) => {
      // Get the drop position
      const dropTime = monitor.getClientOffset();
      // Get the calendar element
      const calendarEl = document.getElementById("calendar");

      if (!calendarEl) return;

      // Get the calendar's bounding rectangle
      const calendarRect = calendarEl.getBoundingClientRect();
      // Calculate the cell width
      const cellWidth = calendarRect.width / 7; // Calculate cell width (7 days in a week)
      const cellHeight = calendarRect.height / 24; // Calculate cell height (24 hours in a day)

      // Calculate the day and time slot where the item was dropped (1-indexed)
      const dayIndex = Math.ceil((dropTime.x - calendarRect.left) / cellWidth);
      const timeSlot = Math.ceil((dropTime.y - calendarRect.top) / cellHeight); // Adjust this as needed

      //Get the start of the calendar week date
      const startDate = calendar.getCurrentData().dateProfile.activeRange.start;
      //Create new instance of the date
      const newDate = new Date(startDate);
      //Calculate the current day of the week with the offset of the drop
      const day = newDate.getDate();
      const currentDay = day + (dayIndex - 1);
      //Set the new date to the current day of the week
      newDate.setDate(currentDay);
      newDate.setHours(timeSlot, 0, 0, 0);

      await setItems((prev: any) => [
        ...prev,
        {
          id: uuidv4(),
          Image: item.foodItem.image,
          title: item.foodItem.name,
          start: formatDateToISO(newDate),
        },
      ]);
      updateNutrients(item.foodItem);
      // updateServings(item);
    },
  });

  useEffect(() => {
    var calendarEl = document.getElementById("calendar");

    if (!calendarEl) {
      // Handle the case where the calendar element is not found
      return;
    }

    const adjustInitialView = () => {
      const windowWidth = window.innerWidth;

      // Adjust the initial view based on the window width
      if (windowWidth < 600) {
        return "timeGridDay"; // For small screens, display a day view
      } else {
        return "timeGridWeek"; // For larger screens, display a week view
      }
    };

    var calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: adjustInitialView(), // Set the initial view based on window width
      slotMinTime: "08:00:00", // Set the minimum time to 8 am
      slotMaxTime: "20:00:00", // Set the maximum time to 8 pm
      editable: true,
      droppable: true,
      eventDrop: handleEventDrop,
      events: items ? [...items] : [],
      eventContent: renderEventContent,
      themeSystem: "custom-calendar-theme",
    });

    setCalendar(calendar);
    calendar.render();

    // Update the initial view when the window is resized
    window.addEventListener("resize", () => {
      calendar.changeView(adjustInitialView());
    });

    return () => {
      window.removeEventListener("resize", () => {
        calendar.changeView(adjustInitialView());
      });
    };
  }, [items]);

  // Define a custom event rendering function
  const renderEventContent = (eventInfo: any) => {
    const imageElement = document.createElement("img");
    imageElement.src = eventInfo.event.extendedProps.Image;
    imageElement.alt = eventInfo.event.title;
    const button = document.createElement("button");
    button.innerHTML = "X";
    button.style.marginBottom = "6px";
    button.className = "remove-item";
    button.onclick = () => {
      const food = items.find((item: any) => item.id === eventInfo.event.id);

      if (food) {
        for (const key in food.nutrition) {
          if (key === "updated_at") continue;
          if (Object.prototype.hasOwnProperty.call(food.nutrition, key)) {
            nutrients[key] -= food.nutrition[key] / food.servings;
          }
        }
      }
      setItems((prev: any) => {
        return prev.filter((item: any) => {
          return item.id !== eventInfo.event.id;
        });
      });
    };
    const content = document.createElement("div");
    content.style.display = "flex";
    content.style.flexDirection = "row";
    content.style.alignItems = "center";
    content.appendChild(imageElement);
    content.appendChild(document.createTextNode(eventInfo.event.title));
    content.appendChild(button);

    return { domNodes: [content] };
  };

  return (
    <div>
      <div ref={drop}>
        <div id="calendar" style={{ width: "100vw", marginLeft: "20px" }}></div>
      </div>
      <div style={{ width: "80vw", marginLeft: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "left",
            paddingTop: 2,
            fontWeight: "bold",
          }}
        >
          Weekly Nutrition
        </Typography>
        <CartChart nutrients={nutrients}></CartChart>
      </div>
    </div>
  );
}
