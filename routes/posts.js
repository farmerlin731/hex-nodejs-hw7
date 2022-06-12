var express = require('express');
var router = express.Router();
var postsController = require("../controllers/posts");
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require('../service/auth');



// router.get('/',postsController.getPosts);

// router.post('/',handleErrorAsync(postsController.createPost));

router.get('/', isAuth, postsController.getPosts);

router.post('/', isAuth, handleErrorAsync(postsController.createPost));


module.exports = router;
