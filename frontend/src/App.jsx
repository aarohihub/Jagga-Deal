import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Signup from "./Pages/users/Signup";
import Login from "./Pages/users/Login";
import VerifyOTP from "./Pages/users/VerifyOTP";
import { Loader } from "lucide-react";
import BaseImage from "../public/images/404.png";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <img
        style={{ height: "50vh", width: "50vh" }}
        src={BaseImage}
        alt="404 Not Found"
        className="bg-transparent"
      />
      <h1 className="text-5xl sm:text-6xl  mt-2 font-semibold">
        Page Not Found
      </h1>
      <Link className="btn glass mt-4" to="/">
        Go to Home Page
      </Link>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div data-theme="winter">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-16 h-16 text-primary" />
        </div>
      ) : (
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Toaster />
    </div>
  );
}

export default App;
