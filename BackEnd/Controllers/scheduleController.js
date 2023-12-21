const schedule = require('../Models/Schdule')
const asyncHandler = require('express-async-handler')
const { Semaphore } = require('async-mutex')

const mutex = new Semaphore(1)

//@desc Get user schedule
//@route GET /api/schedule/events
//@access Private
const getEvents = asyncHandler(async (req, res) => {
  const currSchedule = await schedule.findOne({ email: req.user.email })
  if (!currSchedule) {
    res.status(400).json({ error: 'No schedule found' })
  }
  res.status(200).json({ events: currSchedule.events })
})

//@desc Get user weekly nutrition
//@route GET /api/schedule/nutrition
//@access Private
const getNutrition = asyncHandler(async (req, res) => {
  const currSchedule = await schedule.findOne({ email: req.user.email })
  if (!currSchedule) {
    res.status(400).json({ error: 'No schedule found' })
  }
  res.status(200).json({ nutrition: currSchedule.weeklyNutrition })
})

//@desc Update user schedule
//@route POST /api/schedule/update
//@access Private
const updateSchedule = asyncHandler(async (req, res) => {
  const { newEvents, newNutrients } = req.body

  if (newEvents.length === 0 || newNutrients.length === 0) {
    res.status(401).json({ error: 'Nothing to update' })
  }
  let currentSchedule = await schedule.findOne({ email: req.user.email })
  //User exist in db already
  if (currentSchedule) {
    currentSchedule.events = newEvents
    currentSchedule.weeklyNutrition = newNutrients
  }
  //User does not exist in db
  else {
    currentSchedule = new schedule({
      email: req.user.email,
      events: newEvents,
      weeklyNutrition: newNutrients,
    })
  }
  //Save to db
  try {
    await currentSchedule.save()
    res.status(200).json({ schedule: currentSchedule })
  } catch (error) {
    res.status(400).json({ error: 'Error saving schedule' })
  }
})

module.exports = { getEvents, getNutrition, updateSchedule }
