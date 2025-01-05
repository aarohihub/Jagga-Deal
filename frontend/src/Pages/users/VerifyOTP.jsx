import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { axiosInstance } from "../../libs/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");  // OTP state
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility
  const navigate = useNavigate();

  // Toggle OTP visibility
  const togglePassword = () => setShowPassword(prev => !prev);

  // Handle OTP verification on form submit
  const handelForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/verify/otp", { otp });
      if (!res) toast.error("Otp not sent");
      if (res.data.success) navigate("/");  // Redirect if OTP is verified
      toast.success("Successfully verified");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* OTP input form */}
      <form onSubmit={handelForm}>
        <input 
          type={showPassword ? "number" : "password"} 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
        />
        <div onClick={togglePassword}>{showPassword ? <IoMdEye /> : <FaEyeSlash />}</div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
