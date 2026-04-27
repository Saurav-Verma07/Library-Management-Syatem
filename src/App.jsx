// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import OTP from "./pages/OTP";
// import ResetPassword from "./pages/ResetPassword";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (
//     <Router>
//       <Routes>

//         {/* Default route — redirect to login */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* Pages */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/password/forgot-password" element={<ForgotPassword />} />

//         {/* OTP Verification */}
//         <Route path="/otp-verification/:email" element={<OTP />} />

//         {/* Password Reset */}
//         <Route path="/password/reset-password/:token" element={<ResetPassword />} />

//         {/* Route not found */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>

//       {/* Toast popup UI */}
//       <ToastContainer theme="dark" position="top-right" />
//     </Router>
//   );
// };

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "./store/slices/borrowSlice";


const App = () => {
  const { user,isAuthenticated}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUser())
    dispatch(fetchAllBooks())
    
    if(isAuthenticated && user?.role==="User"){
       dispatch(fetchUserBorrowedBooks())
    }
      if(isAuthenticated && user?.role==="Admin"){
       dispatch(fetchAllUsers())
       dispatch(fetchAllBorrowedBooks())
    }
  },[isAuthenticated])

  
  return <Router>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route
          path="/password/reset/:token"element={<ResetPassword/>}/>
      </Routes>
      <ToastContainer theme="dark" position="top-right" />
    </Router>

};

export default App;
