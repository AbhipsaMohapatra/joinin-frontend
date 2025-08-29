import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { motion, useInView } from "motion/react";
import Skeleton from '@mui/material/Skeleton';
import toast, { Toaster } from "react-hot-toast";
const AI = () => {
    const sectionRef = useRef(null);
      const isinView = useInView(sectionRef, { once: true });

      const [data,setData] = useState("");
      const [prompt,setPrompt] = useState("");
      const [loading,setLoading] = useState(false);
      const [open,setOpen] = useState(false);

      const handleChange = (e)=>{
        e.preventDefault();
        setPrompt(e.target.value);
        
      }

      const handleClick = async()=>{
        
        if(prompt.length==0){
          toast.error("Give Appropriate Prompts");
          return;

        }
        setLoading(true);
        setOpen(true);
        try{
          const res = await fetch('http://localhost:3000/api/chat',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ prompt })})
          if(res.status==500){
            toast.error("Server error please wait for the api to respond");

          }
          let ans = await res.json();
          setData(ans.answer);
          console.log(ans)
          setPrompt("");


        }
        catch(e){
          toast.error(e.message);

        }
        finally{
          setLoading(false);
        }

        
      }




  return (
    <motion.section
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isinView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=" p-10 sm:p-20 bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg min-h-[70vh]"
        >
           <Toaster position="top-center" reverseOrder={false} />

            <div className="container w-full border my-30  sm:my-20 p-10 mx-auto bg-white dark:bg-slate-800 shadow-lg shadow-black dark:shadow-white text-black dark:text-white">

              <div className="flex gap-2 sm:gap-4">
                <input value={prompt} onChange={handleChange} className="border dark:border-white w-2/3 text-black dark:text-white p-2 text-xl " placeholder="Ask Anything" />
                <button type="button" onClick={handleClick} className="border w-1/3 sm:w-1/4 py-3 rounded-lg hover:cursor-pointer hover:scale-105 text-xl hover:bg-green-400">Search</button>
              </div>

              {open&& <div className="border my-5 text-xl p-3">
                <h2 className="text-center font-bold text-2xl my-2">Your answer is</h2>
                {loading?<Skeleton variant="rectangular" className="w-full dark:bg-white" />:<p>{data}</p>}
                

                <button className="my-3 block w-fit p-3 hover:cursor-pointer text-xl border dark:border-white hover:bg-green-500 transition-all duration-150" onClick={()=>setOpen(false)}>Close</button>
                {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. A iste vel voluptatum consequatur illum. Explicabo ea at commodi hic delectus exercitationem eveniet rerum! */}
              </div>}

              



                
                
                
            </div>
      
    </motion.section>
  )
}

export default AI
