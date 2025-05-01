import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ForgetPassword() {
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 🔁 Validate passwords as user types
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }, [newPassword, confirmPassword]);

  const ResetPasswordAPi = async () => {
    // Final validation before sending API request
    if (newPassword.length < 5) {
      setErrorMessage("Password must be at least 5 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, newPassword }),
        }
      );

      const data = await response.json();

      if (data?.otp === otp) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        setErrorMessage("OTP does not match. Please try again.");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="h-screen text-primary font-sans">
      <MDBCard className="mt-40 w-2/6 mx-auto bg-transparent border border-gray-300 shadow-lg rounded-md p-6">
        <MDBCardBody>
          <MDBCardTitle className="text-2xl font-semibold mb-4">
            Reset Password
          </MDBCardTitle>

          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 rounded-md my-3"
              placeholder="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </MDBCardText>

          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 rounded-md my-3"
              placeholder="Enter New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </MDBCardText>

          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 rounded-md my-3"
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && (
              <p className="text-center text-xs text-red-500 mt-2">
                {errorMessage}
              </p>
            )}
          </MDBCardText>

          <MDBBtn
            className="mt-4 h-10 w-full bg-secondary text-white hover:bg-primary"
            onClick={ResetPasswordAPi}
          >
            Verify
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
