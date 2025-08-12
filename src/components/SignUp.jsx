import React from 'react'
import { useForm } from "react-hook-form";
import { motion, useInView } from "motion/react";
import { useRef } from 'react';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
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
    
    <form onSubmit={handleSubmit(onSubmit)} className='my-20'>
        <label htmlFor="firstName">Name :</label>
      <input 
        {...register("firstName", { required: true })} 
        aria-invalid={errors.firstName ? "true" : "false"} 
        placeholder='Enter name'
        className='border bg-white mx-3'
      />
      {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
      <label htmlFor="firstName">Email :</label>

      <input 
        {...register("mail", { required: "Email Address is required" })} 
        aria-invalid={errors.mail ? "true" : "false"} 
         placeholder='Enter Email'
        className='border bg-white mx-3'
      />
      {errors.mail && <p role="alert">{errors.mail?.message}</p>}
      
      <input type="submit" />
    </form>
    </motion.section>
  )
}

export default SignUp
