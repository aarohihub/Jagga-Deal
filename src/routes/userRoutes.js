const express = require("express");
const userRouter = express.Router();

const {
  registerUser,
  loginUser,
  logOutUser,
  verifyOtp,
  resendOtp,
  googleLogin,
  updateProfile,
  showUser,
} = require("../controller/userController");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logOutUser);
userRouter.route("/verify/otp").post(verifyOtp);
userRouter.route("/resend/otp").post(resendOtp);
userRouter.route("/auth/google").post(googleLogin);
userRouter.route("/me/update/:id").put(updateProfile);

userRouter.route("/allUsers").get(showUser);

module.exports = userRouter;
