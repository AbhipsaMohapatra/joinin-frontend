import React from "react";
import { useForm } from "react-hook-form";
import { motion, useInView } from "motion/react";
import { useRef,useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      role: "user",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let url = "";
      let bodyData = {};

      if (data.role === "user") {
        url = "http://localhost:3000/api/users/register";
        bodyData = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
      } else if (data.role === "admin") {
        url = "http://localhost:3000/api/admin/register";
        bodyData = {
          username: data.name,
          email: data.email,
          password: data.password,
        };
      } else {
        toast.error("Please select a role");
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

     const resData = await res.json();

      if (res.status === 201) {
        const token = resData.token;

        if (!token) {
          toast.error("No token found");
          return;
        }

        const jwtToken = jwtDecode(token);
        dispatch(
          login({ user: resData.user, token: jwtToken, accountType: jwtToken.role })
        );
        setLoading(false);
        toast.success(`${data.role} registration successful`);
        

        reset(); // <-- clear form fields here
        navigate("/");
        


      } else {
        const errData = await res.json();
        toast.error(`Error: ${errData.message || "Something went wrong"}`);
      }
    } catch (e) {
      toast.error(e.message || "Error occurred");
    }
    finally{
       setLoading(false);

    }
  };
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });
  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isinView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" p-10 sm:p-20 bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mx-auto border p-8 my-[30%] sm:my-20 w-full sm:w-1/2 bg-white rounded-lg shadow-lg dark:bg-slate-600 dark:text-white">
        <h2 className="text-center text-4xl font-bold font-mono">SignUp</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl font-bold">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              placeholder="Enter Full Name"
              className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4 "
            />
            {errors.name?.type === "required" && (
              <p
                role="alert"
                className="dark:text-red-300 text-red-600 font-semibold"
              >
                {" "}
                Name is required
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-xl font-bold">
              Select Role <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              id="role"
              {...register("role")}
              className="border text-xl  mx-3 outline-none focus:ring-0  text-black w-1/3 cursor-pointer"
            >
              <option value="user" className="cursor-pointer">
                User
              </option>
              <option value="admin" className="cursor-pointer">
                Admin
              </option>
            </select>
            {errors.role?.type === "required" && (
              <p
                role="alert"
                className="dark:text-red-300 text-red-600 font-semibold"
              >
                {" "}
                Name is required
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xl font-bold">
              Email <span className="text-red-600">*</span>
            </label>

            <input
              {...register("email", { required: "Email Address is required" })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Enter Email"
              type="email"
              className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4"
            />
            {errors.email && (
              <p
                role="alert"
                className="dark:text-red-300 text-red-600 font-semibold"
              >
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xl font-bold">
              Password <span className="text-red-600">*</span>
            </label>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Your password should be minimum of 4 characters",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              type="password"
              placeholder="Enter Password"
              className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4"
            />
            {errors.password && (
              <p
                role="alert"
                className="dark:text-red-300 text-red-600 font-semibold"
              >
                {errors.password?.message}
              </p>
            )}
          </div>
          <button className="relative bold mx-auto  bg-green-400 w-1/3 sm:p-3  text-shadow-2xs sm:text-xl font-bold text-black rounded-lg hover:scale-105 transition-all duration-150 cursor-pointer my-3 sm:my-10 overflow-hidden group">
            {loading?<CircularProgress />:"SignUp"}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
          </button>

          {/* <input type="submit" /> */}
        </form>
        <p className="text-[16px] sm:text-xl">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUp;
