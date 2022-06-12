const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.ObjectId,
      ref:'user',
      required: [true, '未帶入 user ID']
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
      }
    ],
    type: {
      type: String,
      enum:['group','person'],
      required: [true, '貼文類型 type 未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    likes: {
      type: Number,
      default: 0
    },
    comments:{
      type: Number,
      default: 0
    },
  });

const Post = mongoose.model('post', postSchema);

module.exports = Post;