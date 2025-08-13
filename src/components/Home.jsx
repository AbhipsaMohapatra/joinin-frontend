import React from "react";
import Typed from "typed.js";
import { useRef } from "react";
import { motion,useInView } from "motion/react";
const Home = () => {
  const el = React.useRef(null);
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef,{once:true});

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
    <motion.section 
     ref={sectionRef}
     initial={{opacity:0,y:50}}
     animate={isinView?{opacity:1,y:0}:{}}
     transition={{ duration: 0.8, ease: "easeOut" }}
     className="min-h-[100vh] container-fluid bg-gradient-to-l from-yellow-200 to-amber-600 dark:bg-slate-700 dark:bg-none p-10 sm:p-30  rounded-lg font-mono">
      <div className="container flex flex-col-reverse sm:flex-row gap-6 sm:gap-10 mx-auto">
        <div className="w-full sm:w-1/2 my-20 sm:my-10   p-10 dark:text-white ">
          <p className="capitalize text-2xl sm:text-4xl  dark:text-cyan-400">
            Welcome to Join In, Folks! 
            
          
          </p>
          

           <p className="text-xl sm:text-3xl mt-5 mb-4 ">It’s time to dive into…</p>
         
          
          
          <span className="text-4xl sm:text-5xl" ref={el}/>
        </div>
        <div className="w-full sm:w-1/2 mt-20 sm:mt-0">
          <img src="../winnerPic3.jpg" className="" />
        </div>
      </div>
    </motion.section>


  );
};

export default Home;
