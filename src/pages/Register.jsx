import React, { useState } from "react";
import logo from "../assets/black-logo.png";
//import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { use } from "react";
import { toast } from "react-toastify";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { useEffect } from "react";
import { Navigate as NavigateTo } from "react-router-dom";
import libsystem from "../assets/libsystem.png"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const navigateTo = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("role", role);

    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo(`/otp-verification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <NavigateTo to="/" />;
  }
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left Side  */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img
                src={libsystem}
                alt="logo"
                className="md-12  h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12 ">
              Already have account Signin Now{" "}
            </p>
            <Link
              to={"/login"}
              className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition"
            >
              Sign in
            </Link>
          </div>
          {/* Right Side */}
        </div>
        <div className="w-full md:w-1/2 flex  items-center  justify-center bg-white p-8">
          <div className="w-full  max-w-sm">
            <div className="flex justify-center md:12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">SignUp</h3>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto  w-24 object-cover "
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Please Provide Your Details to Sign Up
            </p>
            <form onSubmit={handleRegister}>
              {/*Name */}

              <div className="mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>

              {/*Email */}

              <div className="mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>

              {/*Password */}

              <div className="mb-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>

              {/*Role */}
              <div className="mb-2">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>

              <div className="block md:hidden fonr-semibold mt-5">
                <p>
                  Already have Account
                  <Link
                    to={"/login"}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Signin
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
