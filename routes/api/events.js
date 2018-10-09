const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../errorHandlers');
const eventController = require('../../controllers/eventController');
const passport = require('passport');

router.get('/', catchErrors(eventController.fetchEvents));
router.get('/:id', catchErrors(eventController.fetchEvent));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  catchErrors(eventController.createEvent)
);

module.exports = router;
