import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, Links } from 'react-router-dom';

const Footer = () => {
  return (
    <>
       <section className='!min-h-[18vh] bg-slate-900 text-white p-20'>

        <div className='flex flex-col mx-auto gap-5 border-white justify-center items-center'>
            <div className='flex gap-7'>
                <a href='https://www.instagram.com/' target='_blank' className='hover:cursor-pointer'><InstagramIcon sx={{fontSize:"2.5rem"}}  /></a>
                <a href='https://github.com/AbhipsaMohapatra' target="_blank" className='hover:cursor-pointer'><GitHubIcon sx={{fontSize:"2.5rem"}} /></a>
                <a href='http://www.linkedin.com/in/abhipsa-mohapatra' target='_blank' className='hover:cursor-pointer'><LinkedInIcon sx={{fontSize:"2.5rem"}} /></a>
                

            </div>
            <div className='flex gap-6 text-xl my-3'>
                <Link to="/" className='hover:text-cyan-400'>Home</Link>
                <Link to="/about" className='hover:text-cyan-400'>About</Link>
                <Link to="/events" className='hover:text-cyan-400'>Events</Link>

            </div>
            
        </div>

       </section>
        <div className='w-full  bg-slate-800 p-2 text-white text-center text-xl'>
            <p>COPYRIGHT @2025 : Designed By ABHIPSA</p>

        </div>
        </>
  )
}

export default Footer
