require("dotenv").config();

const app = require("./src/db/app");
// const http = require("http");
const connectDB =require("./src/config/db");

// const logger = require("./src/logs/logger.js");
connectDB();

const PORT =process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}`
    );
});
