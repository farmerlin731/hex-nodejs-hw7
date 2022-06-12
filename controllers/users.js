const Users = require('../model/users');
const appError = require('../service/appError');
const successHandler = require('../service/successHandler');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { isAuth, generateSendJWT } = require('../service/auth');



const usersController = {
    async signUp(req, res, next) {
        let errMsg = [];
        let { email, password, confirmPassword, name } = req.body;

        // 內容不可為空
        if (!email || !password || !confirmPassword || !name) { errMsg.push("欄位未填寫正確！"); }
        // 密碼正確
        if (password !== confirmPassword) { errMsg.push("密碼不一致！"); }
        // 密碼 8 碼以上
        if (!validator.isLength(password, { min: 8 })) { errMsg.push("密碼字數低於 8 碼！"); }
        // 是否為 Email
        if (!validator.isEmail(email)) { errMsg.push("Email 格式不正確！") }

        if (errMsg.length) { return appError("400", errMsg.join(' & '), next); }

        // 加密密碼
        password = await bcrypt.hash(req.body.password, 12);
        const newUser = await Users.create({
            email,
            password,
            name
        });

        // Response to user with token.
        generateSendJWT(newUser, 201, res);

    },

    async signIn(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) { return appError(400, '帳號密碼不可為空！', next); }
        // find users with pwd by email
        const user = await Users.findOne({ email }).select('+password');
        const pwdCorrect = await bcrypt.compare(password, user.password);
        if (!pwdCorrect) { return appError(400, '您的密碼不正確', next); }

        generateSendJWT(user, 200, res);
    },

    async updatePassword(req, res, next) {

        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) { return appError("400", "密碼不一致！", next); }
        newPassword = await bcrypt.hash(password, 12);
        const user = await Users.findByIdAndUpdate(req.user.id, {
            password: newPassword
        });
        generateSendJWT(user, 200, res)
    },

    async getProfile(req, res, next) {
        successHandler(res,req.user);
    },

    async updateProfile(req, res, next){        
        const { name } = req.body;
        if(!name) return appError(400, '欄位不可為空！', next);;
        const user = await Users.findByIdAndUpdate(req.user.id,{name});
        user.name = name;
        successHandler(res,user);
    },
};


module.exports = usersController;
