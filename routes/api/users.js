const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/sessionController');

const { catchErrors } = require('../../errorHandlers');

router.get('/test', (req, res) => {
  res.json({
    message: 'Users route'
  });
});

router.post('/register', catchErrors(sessionController.registerUser));
router.post('/login', catchErrors(sessionController.loginUser));

module.exports = router;
