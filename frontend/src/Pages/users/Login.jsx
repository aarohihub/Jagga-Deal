import { useEffect } from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../libs/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../Components/Oauth/OAuth";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 5)
      return toast.error("Password must be at least 5 characters");

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    try {
      dispatch(signInStart());
      const res = await axiosInstance.post("/login", formData);
      dispatch(signInSuccess(res.data.user));
      toast.success("Login successfully");
      if (res.data.user) {
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure());
    }
  };
  return (
    <>
      <div className="font-[sans-serif]  h-full ">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4 select-none ">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>

          <div className="flex items-center md:p-8 p-6  h-full lg:w-11/12 lg:ml-auto rounded-xl">
            <form className="max-w-lg w-full mx-auto">
              <div className="mb-12">
                <h3 className="text-3xl font-semibold  select-none">
                  Log in with your Account
                </h3>
              </div>

              <div className="mt-8">
                <label className=" text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    id="email"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter email"
                    onChange={handelChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-8">
                <label className=" text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    id="password"
                    className="w-full bg-transparent text-sm  border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter password"
                    onChange={handelChange}
                  />
                  <svg
                    onClick={togglePassword}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="mt-12 w-full">
                <div className=" flex flex-col gap-4">
                  <button
                    className="btn glass"
                    onClick={submitForm}
                    disabled={loading}
                  >
                    <Users size={20} strokeWidth={1.75} />
                    {loading ? "Loading..." : "Login"}
                  </button>

                  <OAuth />
                </div>
                <p className="text-sm  mt-8 select-none">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="font-semibold hover:underline ml-1"
                  >
                    Signup here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
