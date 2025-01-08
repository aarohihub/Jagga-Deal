import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { axiosInstance } from "../../libs/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");  // State to store OTP
  const [errorMessage, setErrorMessage] = useState("");  // State for error messages
  const navigate = useNavigate();  // Navigation hook to redirect after success
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility

  // Function to toggle OTP visibility
  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handles form submission for OTP verification
  const handelForm = async (e) => {
    e.preventDefault();  // Prevent default form behavior
    try {
      const res = await axiosInstance.post("/verify/otp", { otp });  // Send OTP to server for verification

      if (!res) {  // Error if no response
        toast.error("Otp not sent");
      }
      if ((res.data.success = true)) {  // Check if OTP is verified
        return navigate("/");  // Navigate to home on success
      }
      toast.success("Successfully verified");
    } catch (error) {  // Handle any error that occurs
      console.log("something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm  border  shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-semibold  mb-4 text-center select-none">
          Verify OTP
        </h2>
        <form onSubmit={handelForm}>
          <div className="mb-4 relative">
            <label
              htmlFor="otpInput"
              className="block text-sm font-medium  mb-2 select-none"
            >
              Enter OTP
            </label>
            <input
              id="otpInput"
              type={showPassword ? "number" : "password"}  // Toggle between password and number input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}  // Update OTP state on input change
              className="w-full px-3 py-2 border   rounded-md focus:outline-none focus:ring "
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-5"
              onClick={togglePassword}  // Toggle the visibility of OTP
            >
              {showPassword ? <IoMdEye /> : <FaEyeSlash />}  // Change icon based on visibility state
            </div>
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 mt-2 text-center">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <button type="submit" className="btn glass w-full">
              Verify
            </button>
            {/* <button type="submit" className="btn glass w-full">
              Resend OTP
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
