import React from 'react'
import { motion ,useInView} from "motion/react"
import { useRef } from 'react'


const About = () => {
    const sectionRef = useRef(null);
    const isinView = useInView(sectionRef,{once:true})
  return (
    <motion.section ref={sectionRef}
     initial={{opacity:0,y:50}}
     animate={isinView?{opacity:1,y:0}:{}}
     transition={{ duration: 0.8, ease: "easeOut" }}
     className=' p-10 sm:p-20 bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg'>
        <div className='p-10 flex flex-col sm:flex-row gap-5 sm:gap-0  items-center'>
            <div className='w-full sm:w-1/2 mt-20 sm:mt-0'>
                <img src="/AboutUsPic.jpg" alt="about us" />
            </div>
            <div className='w-full sm:w-1/3  text-black dark:text-white p-5 flex flex-col gap-5 sm:gap-2'>
            <div className='w-1/2'>

                <h2 className='text-left text-2xl sm:text-3xl capitalize hover:cursor-pointer group '>About Us

                <div className='h-[3px] bg-current w-0 transition-all duration-500 group-hover:w-full'></div>
                </h2>
            </div>

                <div className='text-[22px] '>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum iure sit explicabo nihil in tenetur sequi modi veritatis. Quae incidunt veniam placeat voluptatibus iusto harum? Nisi perspiciatis neque distinctio consectetur molestias accusantium accusamus dolores!
                </div>
            </div>
        </div>

      
    </motion.section>
  )
}

export default About
