const User=require("../models/User");

const Role=require("../models/Role");

const Permission=require("../models/Permission")
module.exports=(permission)=>{

    return async(req,res,next)=>{

        const user=await User.findById(req.user.id)
        .populate({
            path:"role",
            populate:{
                path:"permission"
            }
        });

        const permissions = user.role.permission
        let flag=0;
        for (const element of permissions){            
            if(element.name==permission) {flag=1; break;}
        }
        if(flag==0){
            // console.log("Flag is zero");
            
            return res.status(403).json({

                success:false,
                message:"Permission Denied"

            });

        }

        next();

    }

}