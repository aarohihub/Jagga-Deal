const express = require("express");
const ResetPasswordRouter = express.Router();
const {
  ForgotPassword,
  resetPassword,
} = require("../controller/forgetpasswordController");

ResetPasswordRouter.post("/forgot-password", ForgotPassword);
ResetPasswordRouter.post("/reset-password", resetPassword);
module.exports = ResetPasswordRouter;
