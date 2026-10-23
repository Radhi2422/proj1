const mongoose=require("mongoose");

const productsSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,

    },
    name:{
        type:String,
        unique:true
    },
    image:{
        type:String,
        unique:true
    },
    category:{
        type:String,
        unique:true
    },
    price:{
        
        type:Number,
        unique:true
    },
    rating:{
        type:Number,
        unique:true
    },
    stock:{        
        type:Number,
    }

},
{
    collection: "UserProduct"
}
);

module.exports=mongoose.model("UserProduct",productsSchema);