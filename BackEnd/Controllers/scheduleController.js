const schedule = require('../Models/Schdule');
const asyncHandler = require('express-async-handler');

//@desc Get user schedule
//@route GET /api/schedule
//@access Private
const getSchedule = asyncHandler(async (req, res) => {
	const currSchedule = await schedule.findOne({ email: req.user.email });
	if (!currSchedule) {
		res.status(400).json({ error: 'No schedule found' });
	}
	res.status(200).json({ schedule: currSchedule });
});

//@desc Update user schedule
//@route POST /api/schedule/update
//@access Private
const updateSchedule = asyncHandler(async (req, res) => {
	const newEvents = req.body.events;
	if (!newEvents) {
		res.status(400).json({ error: 'No events found' });
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
		});
		newSchedule.save();
		res.status(200).json({ schedule: newSchedule });
	}
});

module.exports = { getSchedule, updateSchedule };
