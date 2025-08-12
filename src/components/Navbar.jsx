import React from "react";
import { useState, useEffect } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeN") || "light";
  });
  const [ham, setHam] = useState(false);
  useEffect(() => {
    const html = document.getElementById("html");
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("themeN", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  const hamburger = () => {
   setHam((prevham)=>!prevham)
  };

  return (
    <nav className="  p-7 sm:p-3 fixed dark:text-white top-0 left-0 w-full backdrop-blur-sm shadow-lg">
      <div className="flex   flex-col sm:flex-row sm:justify-around sm:items-center">
        <div className="flex justify-between items-center">
          <div className="">
            
            <h2 className="text-5xl text-cyan-600 dark:text-cyan-300 font-semibold cursor-pointer">
              <a href="/">JoinIN</a>
              </h2>
          </div>
          <div
            className="flex gap-2 items-center sm:hidden"
            
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10 hover:cursor-pointer hover:scale-105"
              onClick={hamburger}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
            <div>
              <button
                className="w-auto p-3 bg-blue-500 text-xl rounded-lg hover:cursor-pointer hover:scale-110 hover:transistion-all hover:duration-150"
                onClick={toggleTheme}
              >
                {mode === "dark" ? <IoSunnySharp className="text-2xl"/> :  <BsMoonStarsFill className="text-2xl text-white"/>}
              </button>
            </div>
          </div>
        </div>

        <div className=" sm:flex justify-center items-center sm:justify-between sm:gap-5 mt-4 sm:mt-0 ">
          <ul
            className={` sm:flex flex-col sm:flex-row gap-3 sm:gap-10 sm:my-0 ${ham?"":"hidden"}`}
            id="list"
          >
            <li className="text-center hover:underline hover:cursor-pointer hover:transition-all hover:duration-150 hover:ease-in-out">
              <NavLink className="text-xl font-bold " to="/">
                Home
              </NavLink>
            </li>
            <li className="list">
              <NavLink className="text-xl font-bold " to="/about">
                About
              </NavLink>
            </li>
            <li className="list">
              <NavLink className="text-xl font-bold " to="/events">
                Events
              </NavLink>
            </li>
            <li className="list">
              <a className="text-xl font-bold " href="">
                Login
              </a>
            </li>
            <li className="list">
              <a className="text-xl font-bold " href="">
                SignUp
              </a>
            </li>
          </ul>
          <div className="hidden sm:flex mb-4">
            <button
              className="w-auto p-3 bg-blue-500 text-xl rounded-lg hover:cursor-pointer hover:scale-110 hover:transistion-all hover:duration-150 block mx-auto mt-5 hover:bg-cyan-500"
              onClick={toggleTheme}
            >
              {mode === "dark" ? <IoSunnySharp className="text-2xl"/> : <BsMoonStarsFill className="text-2xl text-white"/>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
