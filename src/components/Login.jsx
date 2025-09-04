import React from "react";
import { useForm } from "react-hook-form";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Tabs, Tab, Typography } from "@mui/material";

function TabPanel({ children, value, index }) {
  return (
    value === index && (
      <Box p={3}>
        {children}
      </Box>
    )
  );
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register: userForm,
    formState: { errors:Usererrors },
    handleSubmit: handleUserSubmit,
    reset: resetUser,
  } = useForm({ defaultValues: { email: "", password: "", role: "user" } });

  const {
    register: adminForm,
    formState: { errors:Adminerrors },
    handleSubmit: handleAdminSubmit,
    reset: resetAdmin,
  } = useForm({ defaultValues: { username: "", password: "", role: "admin" } });

  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });

  const userSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      

      if (res.status === 201) {
        const dataBody = await res.json();
        const token = dataBody.token;
        if (!token) {
          toast.error("No token found");
          return;
        }

        const jwtToken = jwtDecode(token);
        dispatch(
          login({
            user: dataBody.user,
            token,
            accountType: jwtToken.role,
          })
        );
        setLoading(false);
        toast.success(`${data.role} registration successful`);

        resetUser(); // <-- clear form fields here
        navigate("/");
      }
    } catch (e) {
     
      toast.error(`Error: ${e.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  const adminSubmit = async(data) => {
    setLoading2(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });

      

      const dataBody = await res.json();
      if (res.status === 200) {
        const token = dataBody.token;
        if (!token) {
          toast.error("No token found");
          return;
        }

        const jwtToken = jwtDecode(token);
        dispatch(
          login({
            user: dataBody.user,
            token,
            accountType: jwtToken.role,
          })
        );
        setLoading2(false);
        toast.success(`${data.role} registration successful`);

        navigate("/");
        resetAdmin(); // <-- clear form fields here
      }
    } catch (e) {
     
      toast.error(`Error: ${e.message || "Something went wrong"}`);
    } finally {
      setLoading2(false);
    }


  };


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
        <h2 className="text-3xl font-mono font-bold text-center mb-3">Login</h2>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            className="!mx-auto w-fit !text-xl"
          >
            <Tab
              label="User"
              className={
                value === 0
                  ? "!text-blue-500 dark:!text-blue-200 !font-bold !text-xl "
                  : "!text-black dark:!text-white"
              }
            />
            <Tab
              label="Admin"
              className={
                value === 1
                  ? "!text-blue-500 dark:!text-blue-200 !font-bold !text-xl"
                  : "!text-black dark:!text-white"
              }
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <form
              onSubmit={handleUserSubmit(userSubmit)}
              className="my-10 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xl font-bold">
                  Email <span className="text-red-600">*</span>
                </label>

                <input
                  {...userForm("email", {
                    required: "Email Address is required",
                  })}
                  aria-invalid={Usererrors.email ? "true" : "false"}
                  placeholder="Enter Email"
                  type="email"
                  className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4"
                />
                {Usererrors.email && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {Usererrors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xl font-bold">
                  Password <span className="text-red-600">*</span>
                </label>

                <input
                  {...userForm("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message:
                        "Your password should be minimum of 4 characters",
                    },
                  })}
                  aria-invalid={Usererrors.password ? "true" : "false"}
                  type="password"
                  placeholder="Enter Password"
                  className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4"
                />
                {Usererrors.password && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {Usererrors.password?.message}
                  </p>
                )}
              </div>
              <button className="relative bold mx-auto  bg-green-400 w-1/3 sm:p-3  text-shadow-2xs sm:text-xl font-bold text-black rounded-lg hover:scale-105 transition-all duration-150 cursor-pointer my-3 sm:my-10 overflow-hidden group">
                {loading ? <CircularProgress /> : "Login"}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </button>

              {/* <input type="submit" /> */}
            </form>
            <p className="text-[16px] sm:text-xl">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-cyan-500 font-bold hover:underline"
              >
                SignUp
              </Link>
            </p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <form
              onSubmit={handleAdminSubmit(adminSubmit)}
              className="my-10 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl font-bold">
                  UserName <span className="text-red-600">*</span>
                </label>
                <input
                  {...adminForm("username", { required: true })}
                  aria-invalid={Adminerrors.username ? "true" : "false"}
                  placeholder="Enter Full Name"
                  className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4 "
                />
                {Adminerrors.username?.type === "required" && (
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
                <label htmlFor="password" className="text-xl font-bold">
                  Password <span className="text-red-600">*</span>
                </label>

                <input
                  {...adminForm("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message:
                        "Your password should be minimum of 4 characters",
                    },
                  })}
                  aria-invalid={Adminerrors.password ? "true" : "false"}
                  type="password"
                  placeholder="Enter Password"
                  className="border-b-2 text-xl  mx-3 outline-none focus:ring-0 focus:border-b-4"
                />
                {Adminerrors.password && (
                  <p
                    role="alert"
                    className="dark:text-red-300 text-red-600 font-semibold"
                  >
                    {Adminerrors.password?.message}
                  </p>
                )}
              </div>
              <button className="relative bold mx-auto  bg-green-400 w-1/3 sm:p-3  text-shadow-2xs sm:text-xl font-bold text-black rounded-lg hover:scale-105 transition-all duration-150 cursor-pointer my-3 sm:my-10 overflow-hidden group">
                {loading2 ? <CircularProgress /> : "Login"}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </button>

              {/* <input type="submit" /> */}
            </form>
            <p className="text-[16px] sm:text-xl">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-cyan-500 font-bold hover:underline"
              >
                SignUp
              </Link>
            </p>
          </TabPanel>
        </Box>
      </div>
    </motion.section>
  );
};

export default Login;
