const Posts = require('../model/posts');
const Users = require('../model/users');
const successHandler = require('../service/successHandler');


const postsController = {
    async getPosts(req, res, next) {
        const timeSort = req.query.timeSort == "asc" ? "createAt" : "-createAt"
        const allPosts = await Posts.find().populate({
            path: 'user',
            select: 'name photo'
        }).sort(timeSort);
        successHandler(res, allPosts);
    },

    async createPost(req, res, next) {
        const { body } = req;
        body.user = req.user.id;
        const newPost = await Posts.create(body);
        successHandler(res,newPost);
    },
};


module.exports = postsController;