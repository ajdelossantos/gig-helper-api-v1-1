const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/sessionController');
const passport = require('passport');

const { catchErrors } = require('../../errorHandlers');

router.post('/register', catchErrors(sessionController.registerUser));
router.post('/login', catchErrors(sessionController.loginUser));

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  sessionController.returnCurrentUser
);
module.exports = router;
