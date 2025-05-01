const express = require("express");
const ResetPasswordRouter = express.Router();
const {
  ForgotPassword,
  resetPassword,
  resetOtp,
} = require("../controller/forgetpasswordController");

ResetPasswordRouter.post("/forgot-password", ForgotPassword);
ResetPasswordRouter.post("/reset-password", resetPassword);
ResetPasswordRouter.post("/reset-otp", resetOtp);
module.exports = ResetPasswordRouter;
