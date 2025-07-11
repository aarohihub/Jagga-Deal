require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const errorHandler = require("../middleware/error");
const serchRouter = require("../routes/searchRoutes");
const AuctionRoutes = require("../routes/Auction.Routes");
const ResetPasswordRouter = require("../routes/forget.routes");
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// ! import router
const userRouter = require("../routes/userRoutes");
const adminRouter = require("../admin/routes/admin.routes");
const MessageRouter = require("../chat/routes/message_routes");
const MsgRoutes = require("../chat/routes/Msg.Routes");
app.use("/api/v1", userRouter);
app.use("/api/v1", serchRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1", AuctionRoutes);
app.use("/api/v1", ResetPasswordRouter);
app.use("/api/v1", MessageRouter);
app.use("/api/v1", MsgRoutes);
app.use(errorHandler);
app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
