const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const productSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type: String,
        maxlength: 50
    },
    price:{
        type: Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    sold:{
        type:Number,
        maxlength:100, 
        default:0
    },// 몇개가 팔렸는지
    views:{
        type:Number,
        default:0
    }
},{timestamps:true});
//{timestamps:true})는 자동적으로 등록,업데이트 등록

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };