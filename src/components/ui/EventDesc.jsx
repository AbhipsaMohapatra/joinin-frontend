import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import RegisterModal from "./RegisterModal";
import toast, { Toaster } from "react-hot-toast";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
const EventDesc = () => {
  const location = useLocation();
  const { content } = location.state || {};
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState(false);
  const [value, setValue] = React.useState(0);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  function isAvail(b) {
    const last = Date.now();
    const end = new Date(b);
    return end > last;
  }

  const handleFeedback = () => {
    setFeedback(true);
  };

  return (
    <section className="bg-amber-200 dark:bg-slate-500 border">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto w-full sm:w-1/2 border my-[30%] sm:mt-[10%] rounded-lg p-10 bg-gray-100 dark:bg-slate-800 dark:text-white flex flex-col gap-10 shadow-md shadow-black dark:shadow-white">
        <div className="w-full h-[200px] sm:h-[300px]">
          <img
            src={content?.picture || "/cardImage1.avif"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-center text-2xl mb-4 font-bold">
            {content.title}
          </h2>

          <div>
            <h1 className="text-2xl mb-2">About The Event</h1>
            <Divider />
            <p className="my-3 text-xl">{content.description}</p>
          </div>

          <div>
            <h1 className="text-2xl mb-2">Addition Information</h1>
            <Divider />
            <p className="my-3 text-xl">Category : {content.category}</p>
            <p className="my-3 text-xl">Date : {formatDate(content.date)}</p>
            <p className="my-3 text-xl">Venue: {content.venue}</p>
            <p className="my-3 text-xl">Time: {content.time}</p>
            <p className="my-3 text-xl text-red-600 dark:text-red-400">
              Last Date: {formatDate(content.last_date)}
            </p>
          </div>
        </div>

        <div>
          {isAvail(content.last_date) ? (
            <RegisterModal
              open={open}
              setOpen={setOpen}
              id={content.id}
              toast={toast}
            />
          ) : (
            <p>Registrations Closed</p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleFeedback}
            className="bg-cyan-600 p-3 rounded-lg cursor-pointer font-bold text-xl hover:bg-green-500 hover:transition-all hover:duration-150"
          >
            Add FeedBack
          </button>

          <div className="my-10 border dark:border dark:border-white p-3">
            <Box>
              <Rating
                name="simple-controlled"
                value={value}
                
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p>Selected Rating: {value}</p>
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDesc;
