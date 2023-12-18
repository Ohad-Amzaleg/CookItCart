import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import FoodItem from "../../Classes/FoodItem";
import Badge from "@mui/material/Badge";

export const ItemTypes = {
  FOOD_ITEM: "foodItem",
};

interface DragFoodProps {
  foodItem: FoodItem;
  handleRemove: (item: any) => void;
}

export default function DragFood({ foodItem, handleRemove }: DragFoodProps) {
  const [dragCount, setDragCount] = useState(0);

  const [, ref] = useDrag({
    type: ItemTypes.FOOD_ITEM,
    item: { foodItem },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        // Increment the counter when the drag operation ends and the drop occurred
        setDragCount((prevCount) => prevCount + 1);
      }
    },
  });

  useEffect(() => {
    if (foodItem.servings - dragCount === 0) {
      handleRemove(foodItem);
    }
  }, [dragCount]);

  return (
    <div ref={ref} className="selected-item">
      <Badge badgeContent={foodItem.servings - dragCount} color="error">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="floating-item"
        />
      </Badge>
      <span className="item-name">{foodItem.name}</span>
      <button
        onClick={() => {
          handleRemove(foodItem);
        }}
        className="remove-item"
      >
        X
      </button>
    </div>
  );
}
