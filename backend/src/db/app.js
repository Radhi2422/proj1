const express = require("express");
const cors = require("cors");
const compression = require("compression"); //it is used to compress HTTP responses
// const swaggerUi = require("swagger-ui-express");

const logRoutes=require("../routes/logRoutes.js");//checking, to be tested while making routes
const authRoutes =require("../routes/authRoutes");//added logs
const productRoutes = require("../routes/productroutes");
const customerRoutes = require("../routes/customerroutes");
const orderRoutes = require("../routes/orderRoutes");
const errorMiddleware = require("../middleware/errorMiddleware");
const logFrontendError= require("../routes/frontendRoutes.js");
// const requestLogger = require("../logs/requestLogger.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use("/api/logs",logRoutes);
app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders",orderRoutes);
app.use("/frontend-error", logFrontendError);
app.use(errorMiddleware);

module.exports = app;