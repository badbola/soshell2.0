const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/users_controller');


router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
) , userController.createSession)
module.exports = router;

