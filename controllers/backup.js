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
        // // for example
        // if (!body.content) {
        //     const appError = (httpStatus, errMessage, next) => {
        //         const error = new Error(errMessage);
        //         error.statusCode = httpStatus;
        //         error.isOperational = true;
        //         next(error);
        //     }
        //     return appError(400, "你沒有填寫 content 資料_farmer", next);
        // }
        const newPost = await Posts.create(body);
        successHandler(res, newPost);
    },
};


module.exports = postsController;