const mongoose=require("mongoose");

const CartSchema=new mongoose.Schema({
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
    },
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProduct",
        required:true,
    },
    image:{
        type:String,
    },
    title:{
        type:String,
    },
    category:{
        type:String,
    },
    price:{
        type:Number,
    },
    qty:{
        
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
    }

},
{
    collection: "Cart"
}
);

module.exports=mongoose.model("Cart",CartSchema);

//for one user_Id, id should be unique