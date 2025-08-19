import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { motion, useInView } from "motion/react";
import EventCard from "./ui/EventCard";

const Events = () => {
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });
  const [data, setData] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");

  const getEvents = async () => {
    let res = await fetch("http://localhost:3000/api/events", {
      method: "GET",
      headers: { ContentType: "application/json" },
    });

    const data = await res.json();
    if (data) {
      return data.result;
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      setData(events || []);
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredData = data.filter((item)=>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isinView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" p-10 sm:p-20 bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg"
    >
      <div className="container border my-30 sm:my-20 p-10 mx-auto">
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-center dark:text-white">
          Event Lists
        </h2>

       {/* search Bar */}
        <div className="flex justify-center my-5">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border w-full sm:w-1/3 dark:border-amber-200  dark:text-white"
          />
        </div>
        


        <div className="grid grid-col-1 sm:grid-cols-4 gap-4  sm:gap-2 my-10 items-center justify-center">
          {filteredData?.map((item) => (
            <EventCard
              key={item.id}
              picture={item.picture || "/cardImage1.avif"}
              title={item.title}
              category={item.category}
              Date={formatDate(item.date)}
              last_date={formatDate(item.last_date)}
              content={item}
            />
          ))}

          <EventCard
            picture={"/winnerPic.jpg"}
            title={"AI workshop for techies"}
            category={"WorkShop"}

          />
          <EventCard
            picture={"/winnerPic.jpg"}
            title={"Title"}
            category={"WorkShop"}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Events;
