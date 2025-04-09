require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const errorHandler = require("../middleware/error");
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
app.use("/api/v1", userRouter);
app.use(errorHandler);
app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
