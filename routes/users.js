var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');
const handleErrorAsync = require('../service/handleErrorAsync');
const { isAuth } = require('../service/auth');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign_up', handleErrorAsync(usersController.signUp));

router.post('/sign_in',handleErrorAsync(usersController.signIn));
// router.post('/sign_in', isAuth, handleErrorAsync(usersController.signIn));

router.post('/updatePassword', isAuth, handleErrorAsync(usersController.updatePassword));

router.get('/profile', isAuth, handleErrorAsync(usersController.getProfile));

router.patch('/profile', isAuth, handleErrorAsync(usersController.updateProfile));

module.exports = router;
