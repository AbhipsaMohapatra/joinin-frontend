import React from "react";
import Typed from "typed.js";

const Home = () => {
 

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Events', 'Competitions','Workshops'],
      typeSpeed: 50,
      loop:true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);


  return (
    <section className="dark:bg-slate-700 p-10 sm:p-30">
      <div className="container flex flex-col-reverse sm:flex-row gap-6 sm:gap-10 mx-auto">
        <div className="w-full sm:w-1/2 border border-amber-500 p-10 dark:text-white">
        <p className="capitalize text-4xl">Welcome To Join In Folks,Its Time to get some taste of </p>
        <br />
          <span className="text-4xl" ref={el} />
        </div>
        <div className="w-full sm:w-1/2">
          <img src="../winnerPic2.avif" className="" />
        </div>
      </div>
    </section>
  );
};

export default Home;
