const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    userId:{
        type:String,
        unique:true,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    }
  },
{
    timestamps:true,
    collection: "ProductUser"
}
);

// Index on email
userSchema.index({ userID: 1 });
// const User = mongoose.model("User", userSchema);
// console.log(User.collection.name);
module.exports = mongoose.model("User", userSchema);