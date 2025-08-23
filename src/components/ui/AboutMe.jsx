import React from 'react'
import NameAvatar from './NameAvatar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useSelector } from 'react-redux'

const AboutMe = () => {
      const {user} = useSelector(
        (state) => state.auth
      );
  return (
    <div className="container border my-40 sm:my-40 p-10 mx-auto dark:text-white bg-amber-200 dark:bg-slate-800">
      <div className='flex flex-col justify-center items-center w-full gap-2 text-black '>
        <div className='text-3xl dark:!text-white '>
           <AccountCircleIcon sx={{ fontSize: 80 }} />
        </div>
        <div className='border w-full sm:w-1/2 my-10 p-6 text-2xl bg-gradient-to-t from-amber-500 to-gray-200 dark:!text-white dark:bg-gradient-to-t dark:from-pink-500 dark:to-slate-700 '>
            <div>
                <h1 className='font-bold text-2xl text-center my-4 hover:-translate-y-3 hover:cursor-pointer transition-all duration-150'>User Information</h1>
            </div>
            <div className='my-2 flex gap-2'>
                <h2>Name :</h2>
                <p>{user.name}</p>
                 
               
            </div>
            <p className='my-2'>
                 Email Address : {user.email}

            </p>
            <p className='my-2'>
                Role : {user.role}
            </p>
            <p className='my-2'>
                Id : {user.id}
            </p>
            
        </div>
      </div>
    </div>
  )
}

export default AboutMe
