import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import RegisterModal from "./RegisterModal";
import toast, { Toaster } from "react-hot-toast";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";

const EventDesc = () => {
  const location = useLocation();
  const { content } = location.state || {};
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState(false);
  const [value, setValue] = React.useState(0);
  const [feedData, setFeedData] = React.useState({ rating: 0, comment: "" });
  const [error, setError] = useState({ flag: false, message: "" });
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

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
    setFeedback((prev) => !prev);
  };
  const handleFeedData = (e) => {
    e.preventDefault();
    setFeedData({ ...feedData, [e.target.name]: e.target.value });
    setError({flag:false,message:""});
  };
  const handleFeedBackSubmit = async () => {
    setLoading(true);

    if (feedData.comment.length == 0) {
      setError({ flag: true, message: "Please write some message" });
      setLoading(false);
      return;
    }
    try {
      console.log(token);
      const res = await fetch(
        `http://localhost:3000/api/events/${content.id}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(feedData),
        }
      );

      const data = await res.json();
      console.log(data)

      if (res) {
        toast.success(data.message);
      } else {
        toast.error("Some error occured");
      }
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setFeedData({ rating: 0, comment: "" });
    }
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
            {content?.title}
          </h2>

          <div>
            <h1 className="text-2xl mb-2">About The Event</h1>
            <Divider />
            <p className="my-3 text-xl">{content?.description}</p>
          </div>

          <div>
            <h1 className="text-2xl mb-2">Addition Information</h1>
            <Divider />
            <p className="my-3 text-xl">Category : {content?.category}</p>
            <p className="my-3 text-xl">Date : {formatDate(content?.date)}</p>
            <p className="my-3 text-xl">Venue: {content?.venue}</p>
            <p className="my-3 text-xl">Time: {content?.time}</p>
            <p className="my-3 text-xl text-red-600 dark:text-red-400">
              Last Date: {formatDate(content?.last_date)}
            </p>
          </div>
        </div>

        <div>
          {isAvail(content?.last_date) ? (
            <RegisterModal
              open={open}
              setOpen={setOpen}
              id={content?.id}
              toast={toast}
            />
          ) : (
            <p className="text-xl text-red-700">
              Sorry! Registrations are Closed
            </p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleFeedback}
            className="bg-cyan-400 p-3 rounded-lg cursor-pointer font-bold text-xl hover:bg-green-500 hover:transition-all hover:duration-150"
          >
            {feedback ? "Close FeedBack" : "Add Feedback"}
          </button>
          {feedback && (
            <div className=" my-10 border dark:border dark:border-white p-3 bg-pink-100 dark:bg-gray-600">
              <Box>
                <Rating
                  name="rating"
                  value={feedData.rating}
                  onChange={(event, newValue) =>
                    setFeedData({ ...feedData, rating: newValue })
                  }
                />
                <p className="text-xl">Selected Rating: {value}</p>
              </Box>
              <div className="my-3">
                <TextareaAutosize
                  aria-label="minimum height"
                  name="comment"
                  minRows={3}
                  value={feedData.comment}
                  onChange={handleFeedData}
                  placeholder="Please be specific while writing your feedback"
                  style={{
                    width: "100%",
                    border: "2px solid black",
                    padding: "3px",
                    fontSize: "20px",
                  }}
                />
              </div>
              {error.flag && (
                <p className="text-xl text-red-500 dark:text-red-400">
                  Please write a message for us{" "}
                </p>
              )}
              <button
                disabled={loading}
                type="submit"
                onClick={handleFeedBackSubmit}
                className="w-1/2 block p-3 text-xl mx-auto rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 font-bold cursor-pointer hover:scale-105 transisiton-all duration-100"
              >
                {loading ? <CircularProgress /> : "Submit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDesc;
