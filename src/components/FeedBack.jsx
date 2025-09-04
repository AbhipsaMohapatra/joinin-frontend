import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { motion, useInView } from "motion/react";
import FeedModal from "./ui/FeedModal";

const FeedBack = () => {
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null);
    

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
  //   console.log(data)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
    const filteredData = data.filter((item)=>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b)=> new Date(b.date)- new Date(a.date));

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isinView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" p-10 sm:p-20 bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg"
    >
      <div className="container min-h-[20vh]  my-30 sm:my-20 p-10 mx-auto bg-yellow-200 dark:bg-slate-700 w-full border-2 border-dashed rounded-lg dark:border-white">

        {/* search Bar */}
        <div className="flex justify-center my-5">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border w-full sm:w-1/3 dark:bg-slate-800 bg-amber-100 dark:border-amber-200  dark:text-white text-xl"
          />
        </div>

        <div className="grid grid-cols-2  sm:grid-cols-4 gap-5 ">
          {filteredData
            .map((items) => (
              <div
                key={items.id}
                className="dark:text-white text-xl border p-3 flex flex-col sm:flex-row items-center gap-4 rounded-lg shadow-xl dark:shadow-white dark:shadow-md"
              >
                {/* Image */}
                <img
                  src={items.picture || "/cardImage1.avif"}
                  alt={items.title}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* Text Section */}
                <div className="flex flex-col justify-center gap-2">
                  <p>Title: <span className="font-bold ">{items.title}</span></p>
                  <p>Time: <span className="font-bold ">{formatDate(items.date)}</span> </p>
                  <button
                    className="w-fit p-2 bg-cyan-500 text-black rounded-lg"
                    onClick={() => {
                      setSelectedId(items.id);
                      setOpen(true);
                    }}
                  >
                    See Feedback
                  </button>
                </div>
                <FeedModal open={open} setOpen={setOpen} id={selectedId} />
              </div>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeedBack;
