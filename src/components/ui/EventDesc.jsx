import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";

const EventDesc = () => {
  const location = useLocation();
  const { content } = location.state || {};

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

};
function isAvail(a, b) {
  const last = new Date(a);
  const end = new Date(b);
  return end < last;
}

  return (
    <section>
      <div className="mx-auto w-full sm:w-1/2 border my-[30%] sm:mt-[10%] rounded-lg p-10 dark:bg-slate-700 dark:text-white flex flex-col gap-10">
        <div className="w-full h-[200px] sm:h-[300px]">
          <img src={content.picture} className="w-full h-full object-cover" />
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
        <button
          type="button"
          disabled={isAvail(content.last_date, content.date)}
          className="bg-cyan-600 p-3 rounded-lg cursor-pointer font-bold text-xl hover:bg-green-500 hover:transition-all hover:duration-150"
        >
          Register
        </button>
      </div>
    </section>
  );
};

export default EventDesc;
