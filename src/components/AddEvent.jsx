import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { motion, useInView } from "framer-motion";

import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";

const AddEvent = () => {
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });
  const [add, setAdd] = useState(true);
  const [loading, setLoading] = useState(false);
  const {user,token} = useSelector((state)=>state.auth);
  
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      let finalData;
      // Prepare FormData for Cloudinary
      const data = new FormData();
      data.append("file", formData.picture[0]); // picture is a FileList
      data.append("upload_preset", "Joinin"); // Your Cloudinary preset

      // Upload to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/divrqv1q7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const upload = await res.json();

      if (upload.secure_url) {
        // Merge uploaded image URL into form data
        finalData = {
          ...formData,
          time:
            formData.time.length === 5 ? `${formData.time}:00` : formData.time, // HH:mm → HH:mm:ss
          last_date: formData.last_date.includes("T")
            ? formData.last_date.replace("T", " ") + ":00" // from datetime-local → YYYY-MM-DD HH:mm:ss
            : formData.last_date, // already formatted correctly
          picture: upload.secure_url,
        };
        

        toast.success("Event submitted with image!");
      } else {
        toast.error("Image upload failed");
      }

      const result = await fetch("http://localhost:3000/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });
      let resdata = await result.json();

      if (result.status == 200) {
        toast.success("Event created Successfully");
        console.log("the res data is " + JSON.stringify(resdata));
        reset();
        setAdd(true);
      } else {
        toast.error(resdata?.message || "Failed to create event");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isinView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" p-10 sm:p-20 bg-gradient-to-r min-h-[80vh] from-yellow-400 to-amber-200 dark:bg-slate-800 dark:bg-none rounded-lg"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container min-h-[20vh]  my-30 sm:my-20 p-10 mx-auto bg-yellow-200 dark:bg-slate-700 w-full sm:w-1/2 border-2 border-dotted dark:border-white">
        <div className="flex justify-center items-center gap-5">
          <p className="text-3xl font-bold font-mono dark:text-white">
            Add Event
          </p>

          <button
            onClick={() => setAdd((p) => !p)}
            className="w-fit p-2 bg-green-400 border hover:cursor-pointer hover:animate-wiggle"
          >
            {add ? <AddIcon /> : <CloseIcon />}
          </button>
        </div>
        {!add && (
          <div className="bg-white dark:bg-slate-600 border rounded-lg  my-5 p-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 "
            >
              {/* Title */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="title">
                  Enter Title{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Title"
                  className="border w-1/2 px-4 py-2 overflow-x-scroll dark:bg-slate-700 dark:text-white"
                  {...register("title", {
                    required: "Please fill this field",
                    minLength: {
                      value: 5,
                      message: "Your title should have at least 5 characters",
                    },
                  })}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="flex gap-5 items-center">
                <label
                  className="text-xl dark:text-white"
                  htmlFor="description"
                >
                  Enter Description{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter Description"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("description", {
                    required: "Please fill this field",
                    minLength: {
                      value: 10,
                      message: "Description should have at least 10 characters",
                    },
                  })}
                  aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>
              <Divider />

              {/* Date */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="date">
                  Enter Date{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("date", { required: "Please select a date" })}
                  aria-invalid={errors.date ? "true" : "false"}
                />
                {errors.date && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Time */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="time">
                  Enter Time{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("time", { required: "Please select a time" })}
                  aria-invalid={errors.time ? "true" : "false"}
                />
                {errors.time && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.time.message}
                  </p>
                )}
              </div>

              {/* Venue */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="venue">
                  Enter Venue{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  placeholder="Enter Venue"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("venue", { required: "Please enter the venue" })}
                  aria-invalid={errors.venue ? "true" : "false"}
                />
                {errors.venue && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.venue.message}
                  </p>
                )}
              </div>
              <Divider />

              {/* Category */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="category">
                  Enter Category{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter Category"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("category", {
                    required: "Please enter category",
                  })}
                  aria-invalid={errors.category ? "true" : "false"}
                />
                {errors.category && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Picture */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="picture">
                  Upload Picture{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("picture", {
                    required: "Please upload a picture",
                  })}
                  aria-invalid={errors.picture ? "true" : "false"}
                />
                {errors.picture && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.picture.message}
                  </p>
                )}
              </div>

              {/* Last Date */}
              <div className="flex gap-5 items-center">
                <label className="text-xl dark:text-white" htmlFor="last_date">
                  Enter Last Date{" "}
                  <span className="text-red-600 dark:text-red-300">*</span>
                </label>
                <input
                  type="date"
                  name="last_date"
                  id="last_date"
                  className="border w-1/2 px-4 py-2 dark:bg-slate-700 dark:text-white"
                  {...register("last_date", {
                    required: "Please select the last date",
                  })}
                  aria-invalid={errors.last_date ? "true" : "false"}
                />
                {errors.last_date && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {errors.last_date.message}
                  </p>
                )}
              </div>
              <Divider
                sx={(theme) => ({
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.2)",
                })}
              />

              <button
                type="submit"
                className="relative py-3 px-6 border rounded-lg bg-teal-400 text-xl text-black overflow-hidden hover:cursor-pointer
             before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full 
             before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent 
             before:skew-x-[-20deg] before:transition-all before:duration-900 hover:before:left-[100%] hover:scale-105"
              >
                {loading ? <CircularProgress /> : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AddEvent;
