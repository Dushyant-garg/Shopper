import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    photo:{
        type:String,
        // required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    shipping:{
        type:Boolean
    }
},{timestamps:true})
export default mongoose.model('Products',productSchema)