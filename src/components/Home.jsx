import React from "react";
import Typed from "typed.js";

const Home = () => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Workshops", "Competitions", "Hackathons", "Webinars", "Bootcamps",
        "Tech Fests", "Meetups", "Summits", "Open Mics", "Innovation Challenges"],
      typeSpeed: 50,
      backSpeed:50,
      loop:true,
      showCursor:true,
      
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);


  return (
    <section className="dark:bg-slate-700 p-10 sm:p-30">
      <div className="container flex flex-col-reverse sm:flex-row gap-6 sm:gap-10 mx-auto">
        <div className="w-full sm:w-1/2 border border-amber-500 p-10 dark:text-white ">
          <p className="capitalize text-4xl font-bold text-cyan-400">
            Welcome to Join In, Folks! 
            
          
          </p>
          

           <p className="text-5xl mt-5 mb-4 text-purple-600">It’s time to dive into…</p>
         
          
          
          <span className="text-5xl" ref={el}/>
        </div>
        <div className="w-full sm:w-1/2">
          <img src="../winnerPic3.jpg" className="" />
        </div>
      </div>
    </section>
  );
};

export default Home;
