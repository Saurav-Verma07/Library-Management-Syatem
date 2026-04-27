import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import avatarHolder from "../assets/avatarholder.png";

import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotlalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((user) => user.role === "User");
    let numberOfAdmin = users.filter((user) => user.role === "Admin");
    setTotlalUsers(numberOfUsers.length);
    setTotalAdmins(numberOfAdmin.length);

    let numberofTotalBorrowedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate === null,
    );

    let numberofTotalReturnedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate !== null,
    );
    setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberofTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);
  const data = {
    labels: ["total Borrowed Books", "total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-100">
        <Header />
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Side: Pie Chart */}
          <div className="xl:flex-[2] flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
              <Pie
                data={data}
                options={{
                  cutout: 50,
                  responsive: true,
                  maintainAspectRatio: true,
                }}
                className="w-64 h-64 sm:w-72 sm:h-72"
              />
              <div className="flex flex-col gap-2 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                  <span>Total Borrowed Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                  <span>Total Returned Books</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="xl:flex-[4] flex flex-col gap-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
                <span className="bg-gray-300 w-16 h-16 flex justify-center items-center rounded-lg">
                  <img src={usersIcon} alt="users-icon" className="w-8 h-8" />
                </span>
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold">{totalUsers}</h4>
                  <p className="text-gray-600 text-sm">Total User Count</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
                <span className="bg-gray-300 w-16 h-16 flex justify-center items-center rounded-lg">
                  <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                </span>
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold">{totalBooks}</h4>
                  <p className="text-gray-600 text-sm">Total Books Count</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
                <span className="bg-gray-300 w-16 h-16 flex justify-center items-center rounded-lg">
                  <img src={adminIcon} alt="admin-icon" className="w-8 h-8" />
                </span>
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold">{totalAdmins}</h4>
                  <p className="text-gray-600 text-sm">Total Admins Count</p>
                </div>
              </div>
            </div>

            {/* User Profile and Quote */}
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center flex-1">
                <img
                  src={(user && user?.avatar?.url) || avatarHolder}
                  alt="avatar"
                  className="rounded-full w-32 h-32 object-cover"
                />
                <h2 className="text-xl 2xl:text-2xl font-semibold text-center mt-3">
                  {user?.name}
                </h2>
                <p className="text-gray-600 text-sm 2xl:text-base text-center mt-2">
                  Welcome to your admin dashboard. Here you can manage all the
                  settings and monitor the statistics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex-1 flex justify-center items-center">
                <div className="text-center">
                  <h4 className="text-lg sm:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
                    Reading is a powerful habit that drives personal growth,
                    guiding you toward excellence while shaping and refining
                    your character.
                  </h4>
                  <p className="text-gray-900 text-sm sm:text-base mt-3">
                    ~Team Library Management System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {settingPopup && <settingPopup />}
      </main>
    </>
  );
};

export default AdminDashboard;
