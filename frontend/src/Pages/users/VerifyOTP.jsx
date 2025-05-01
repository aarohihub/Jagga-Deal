import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import { axiosInstance } from "../../libs/axios";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handelForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/verify/otp", { otp });

      if (!res) {
        toast.error("Otp not sent");
      }
      if ((res.data.success = true)) {
        return navigate("/");
      }
      toast.success("sucessfully verified");
    } catch (error) {
      console.log("something went wrong", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen text-primary ">
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
              type={showPassword ? "number" : "password"}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border   rounded-md focus:outline-none focus:ring "
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-5"
              onClick={togglePassword}
            >
              {showPassword ? <IoMdEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 mt-2 text-center">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <button type="submit" className="btn glass w-full text-secondary">
              Verify
            </button>
            <Link to="/resend-otp" className="btn glass w-full text-yellow-800">
              Resend OTP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
