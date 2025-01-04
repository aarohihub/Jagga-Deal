import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGooglePlusG } from "react-icons/fa6";
import { axiosInstance } from "../../libs/axios";
import toast from "react-hot-toast";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelGoogleOauthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const fullName = result.user.displayName;
      const email = result.user.email;
      const avatar = result.user.photoURL;
      let res = await axiosInstance.post("/auth/google", {
        fullName,
        email,
        avatar,
      });

      if (!res) {
        toast.error("Failed to authenticate with Google");
      }
      dispatch(signInSuccess(res.data.user));
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      console.log("Failed to sign in with Google", error);
    }
  };

  return (
    <>
      <button className="btn glass" onClick={handelGoogleOauthClick}>
        <FaGooglePlusG className="w-6 h-6" />
        Google
      </button>
    </>
  );
}
