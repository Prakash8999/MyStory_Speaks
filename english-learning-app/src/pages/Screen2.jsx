import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Screen2 = () => {
  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-7 justify-start items-center px-7 py-10'>
      <div className='w-full'><Link  to={'/login'} className='w-full flex justify-end text-textGray text-lg'>Skip</Link></div>

      <div className='h-full flex flex-col justify-between'>
        <div></div>

        <div className='flex flex-col items-center'>
          <img className='w-[250px]' src="/assets/screen2.svg" alt="" />
          <div>
            <h1 className='text-2xl text-center font-bold text-textBlue'>Can upload your story</h1>
            <p className='text-lg text-center text-textGray'>You can also upload your story in the form of text and ask related question in the form of voice or chat</p>
          </div>
        </div>

        <div className='w-full flex justify-between items-center'>
          <Link to={"/screen1"}>
            <IoArrowBackCircleOutline className='w-8 h-8 text-textBlue' />
          </Link>
          <div className='flex gap-1 items-center'>
            <div className='h-2 w-2 rounded-full bg-lightGray'></div>
            <div className='h-3 w-3 rounded-full bg-textBlue'></div>
            <div className='h-2 w-2 rounded-full bg-lightGray'></div>
          </div>
          <Link to={"/screen3"}>
            <IoArrowForwardCircleOutline className='w-8 h-8 text-textBlue' />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Screen2
