//Here are all routes.

const express = require('express')
const router = express.Router();
const controllers = require('../controllers');
const authMiddleware = require('../middleware/auth')();



//PROFILE
router.post('/saveprofile', authMiddleware.authenticate(), controllers.profileController.saveProfile);

// USER
router.post('/login', controllers.userController.login);
router.post('/register', controllers.userController.register);




module.exports = router;
