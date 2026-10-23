const mongoose=require("mongoose");

const roleSchema=new mongoose.Schema({

    roleName:{
        type:String,
        unique:true
    },

    permission:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Permission",
        required:true
    }]

},
{
    collection: "Role"
}

);

module.exports=mongoose.model("Role",roleSchema);