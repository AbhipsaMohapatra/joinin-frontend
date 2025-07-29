import React from "react";
import { useState,useEffect } from "react";

const Navbar = () => {
  const [mode,setMode] = useState(()=>{return localStorage.getItem('themeN')||'light'});
  const [ham,setHam] = useState(false);
  useEffect(() => {
    const html = document.getElementById('html');
    if(mode==='dark'){
      html.classList.add('dark')
    }
    else{
      html.classList.remove('dark');
    }
    localStorage.setItem("themeN", mode);
    
  
    
  }, [mode]);

  const toggleTheme= ()=>{
    setMode((prev)=>(prev==='light'?'dark':'light'))
  }
  const hamburger = ()=>{
    let list = document.getElementById('list');
    setHam(ham=>!ham);
    if(ham){
      
      list.classList.add('hidden');

    }
    else{
      list.classList.remove('hidden');
    }

  }


  

  return (
    <nav className="bg-amber-100 dark:bg-slate-600 dark:text-white p-8 sm:p-10">
      <div className="flex   flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex justify-between items-center">
            <div>
          <h2 className="text-4xl text-blue-500 font-semibold">JoinIN</h2>
          </div>
        <div className="flex gap-2 items-center sm:hidden" onClick={hamburger}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 hover:cursor-pointer hover:scale-105"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          <div>
            <button className="w-auto p-3 bg-blue-500 text-xl rounded-lg hover:cursor-pointer hover:scale-110 hover:transistion-all hover:duration-150" onClick={toggleTheme}>
              {mode === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        </div>
        
        <div className=" sm:flex justify-center items-center sm:justify-between sm:gap-5 mt-4 sm:mt-0 ">
          <ul className="hidden  sm:flex flex-col sm:flex-row gap-3 sm:gap-10 sm:my-0" id="list">
            <li className="text-center hover:scale-125 hover:cursor-pointer hover:transition-all hover:duration-150 hover:ease-in-out">
              <a className="text-2xl font-bold " href="">Home</a>
            </li>
            <li className="list">
              <a className="text-2xl font-bold " href="">About</a>
            </li>
            <li className="list">
              <a className="text-2xl font-bold " href="">Events</a>
            </li>
            <li className="list">
              <a className="text-2xl font-bold " href="">Login/SignUp</a>
            </li>
          </ul>
          <div className="hidden sm:flex mb-4">
            <button className="w-auto p-3 bg-blue-500 text-xl rounded-lg hover:cursor-pointer hover:scale-110 hover:transistion-all hover:duration-150 block mx-auto mt-5" onClick={toggleTheme}>
             {mode === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
