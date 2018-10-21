//Here are all routes.

const express = require('express')
const router = express.Router();
const controllers = require('../controllers');
const authMiddleware = require('../middleware/auth')();


// INSIGHTS
router.post('/searchcar', authMiddleware.authenticate(), controllers.insightController.searchCar);

//PROFILE
router.post('/saveprofile', authMiddleware.authenticate(), controllers.profileController.saveProfile);

// USER
router.post('/login', controllers.userController.login);
router.post('/register', controllers.userController.register);




module.exports = router;
