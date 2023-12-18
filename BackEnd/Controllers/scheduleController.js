const schedule = require("../Models/Schdule");
const asyncHandler = require("express-async-handler");

//@desc Get user schedule
//@route GET /api/schedule/events
//@access Private
const getEvents = asyncHandler(async (req, res) => {
  const currSchedule = await schedule.findOne({ email: req.user.email });
  if (!currSchedule) {
    res.status(400).json({ error: "No schedule found" });
  }
  res.status(200).json({ events: currSchedule.events });
});

//@desc Get user weekly nutrition
//@route GET /api/schedule/nutrition
//@access Private
const getNutrition = asyncHandler(async (req, res) => {
  const currSchedule = await schedule.findOne({ email: req.user.email });
  if (!currSchedule) {
    res.status(400).json({ error: "No schedule found" });
  }
  res.status(200).json({ nutrition: currSchedule.weeklyNutrition });
});

//@desc Update user schedule
//@route POST /api/schedule/update/events
//@access Private
const updateEvents = asyncHandler(async (req, res) => {
  const newEvents = req.body.data;
  if (!newEvents) {
    res.status(400).json({ error: "No events found" });
  }

  const currentSchedule = await schedule.findOne({ email: req.user.email });

  if (currentSchedule) {
    currentSchedule.events = newEvents;
    currentSchedule.save();
    res.status(200).json({ schedule: currentSchedule });
  } else {
    const newSchedule = new schedule({
      email: req.user.email,
      events: newEvents,
      weeklyNutrition: {},
    });
    newSchedule.save();
    res.status(200).json({ schedule: newSchedule });
  }
});

//@desc Update user weekly nutrition
//@route POST /api/schedule/update/nutrition
//@access Private
const updateNutrition = asyncHandler(async (req, res) => {
  const newNutrition = req.body.data;
  if (!newNutrition) {
    res.status(400).json({ error: "No nutrition found" });
  }

  const currentSchedule = await schedule.findOne({ email: req.user.email });

  if (currentSchedule) {
    currentSchedule.weeklyNutrition = newNutrition;
    currentSchedule.save();
    res.status(200).json({ schedule: currentSchedule });
  } else {
    const newSchedule = new schedule({
      email: req.user.email,
      events: [],
      weeklyNutrition: newNutrition,
    });
    newSchedule.save();
    res.status(200).json({ schedule: newSchedule });
  }
});

module.exports = { getEvents, getNutrition, updateEvents, updateNutrition };
