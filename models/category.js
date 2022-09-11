// name, active(boolean),createdAt

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const CategoryModel = mongoose.model('Category',categorySchema);
module.exports = CategoryModel;
