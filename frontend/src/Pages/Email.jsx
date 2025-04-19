import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function Email() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const fogetPassword = async (e) => {
    try {
      e.preventDefault();
      if (!email.trim()) {
        setError("Email cannot be empty");

        return;
      }
      const forgetAPI = await fetch(
        "http://localhost:8080/api/v1/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (forgetAPI) {
        let result = await forgetAPI.json();
        if (!result) {
          return toast.error("Email not found");
        }
        toast.success("Email sent successfully");
        navigateTo("/forget/password");
      }
    } catch (error) {
      console.log("An error occurred during forgetpassword click:", error);
    }
  };
  return (
    <>
      <div className="h-screen text-primary font-sans">
        <MDBCard className="mt-40 w-2/6 mx-auto bg-transparent border border-gray-300 shadow-lg rounded-md p-6 ">
          <MDBCardBody>
            <MDBCardTitle className="text-3xl font-sans text-center">
              Verify your Email
            </MDBCardTitle>
            <MDBCardText>
              <MDBInput
                placeholder="Enter your email"
                className="w-full py-2 px-3 border mt-4 border-orange-400  rounded-md my-3"
                id="otpInput"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </MDBCardText>
            <MDBBtn
              className="mt-4 h-10 w-full bg-secondary text-white hover:bg-primary focus:outline-none focus:border-slate-700 focus:ring focus:ring-blue-200"
              onClick={fogetPassword}
              to="/forget/password"
            >
              Verify
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
}
