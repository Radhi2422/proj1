const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("MongoDB Connected"))
        .catch(err=>console.log(err));
        
    }
    catch(error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             maxPoolSize: 10,
//             minPoolSize: 2
//         }).then(()=>console.log("MongoDB Connected"))
//         .catch(err=>console.log(err));
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;