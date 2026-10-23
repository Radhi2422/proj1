const mongoose=require("mongoose");

const permissionSchema=new mongoose.Schema({

    name:{
        type:String,
        unique:true
    }

},
{
    collection: "Permission"
}
);

module.exports=mongoose.model("Permission",permissionSchema);