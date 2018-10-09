const Event = require('../models/Event');
const validateEventInput = require('../validation/event');

exports.fetchEvents = async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  if (!events)
    return res.status(404).json({ noeventsfound: 'No events found.' });

  return res.json(events);
};

exports.fetchEvent = async (req, res) => {
  const event = Event.findById(req.params.id);
  if (!event) return res.status(404).json({ noeventfound: 'No event found.' });

  return res.json(event);
};

exports.createEvent = async (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newEvent = new Event({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  });

  const savedEvent = await newEvent.save();
  if (savedEvent) return res.json(savedEvent);
};
