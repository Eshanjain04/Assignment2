const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{type:String , required:true},
    body:{type:String , required:true},
    image:String,
    user:{type:Schema.Types.ObjectId, ref:"user"},
});

const post = mongoose.model("post",postSchema);

module.exports = post;