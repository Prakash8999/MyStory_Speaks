import React, { useState } from 'react'
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ContextAuth } from '../context/Context';
import CircularProgressBar from "../components/CircularProgressBar"
import Spinner from '../components/Spinner';

const Main = () => {
  const { account, profileLoading } = ContextAuth();
  return (
    <>
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-7 justify-between items-center px-5 pt-5 pb-9'>
      <div className='w-full grid gap-5'>
        <div className='w-full flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-textBlue'>Hi {account?.name},</h1>
            <p className='text-lg text-textGray'>Keep your way to learn</p>
          </div>
          <Link to={"/profile"}>
          <div className='border-2 p-2 border-textBlue rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C305E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          </div>
          </Link>
        </div>

        <div className='bg-textBlue relative flex items-end justify-center rounded-2xl p-5 mt-5 h-[130px]'>
          <img className='w-[50%]' src="/assets/boy.png" alt="" />
          <div className='w-[50%] flex flex-col'>
            <h1 className='text-2xl font-bold text-lightWhite'>Lets Learn <br /> More</h1>
            <p className='w-full text-lightWhite text-sm mt-1'>Get Started</p>
          </div>
        </div>

        <div className='w-full grid gap-5'>
          <h2 className='text-2xl font-medium'>Choose your level</h2>
          <div className='grid gap-4'>
            <Link to={'/selectStory?type=easy'} className='bg-lightWhite p-5 rounded-3xl boxShadow flex justify-between items-center'>
              <div className='flex flex-col'>
                <h2 className='font-medium text-lg '>Easy level</h2>
                <div className='flex gap-2 items-center'>
                  <div className='w-2 h-2 bg-textBlue rounded-full'></div>
                  <p className='text-textGray'>Stories: <span className='text-textBlue'>3</span></p>
                </div>
              </div>
              {/* <CircularProgressBar
                progress={40}
              /> */}
            </Link>
            <Link to={'/selectStory?type=medium'} className='bg-lightWhite p-5 rounded-3xl boxShadow flex justify-between items-center'>
              <div className='flex flex-col'>
                <h2 className='font-medium text-lg '>Medium level</h2>
                <div className='flex gap-2 items-center'>
                  <div className='w-2 h-2 bg-textBlue rounded-full'></div>
                  <p className='text-textGray'>Stories: <span className='text-textBlue'>3</span></p>
                </div>
              </div>
              {/* <CircularProgressBar
                progress={40}
              /> */}
            </Link>
            <Link to={'/selectStory?type=hard'} className='bg-lightWhite p-5 rounded-3xl boxShadow flex justify-between items-center'>
              <div className='flex flex-col'>
                <h2 className='font-medium text-lg '>Hard level</h2>
                <div className='flex gap-2 items-center'>
                  <div className='w-2 h-2 bg-textBlue rounded-full'></div>
                  <p className='text-textGray'>Stories: <span className='text-textBlue'>3</span></p>
                </div>
              </div>
              {/* <CircularProgressBar
                progress={40}
              /> */}
            </Link> 
          </div>
        </div>
      </div>

      <div className='w-full'>
        <Button to={"/uploadStory"} text={"Add your text file"} />
      </div>

    </div>
    <div className={profileLoading ? 'h-screen w-screen bg-purpleWhite fixed top-0 left-0 z-50 opacity-100' : 'h-screen w-screen bg-purpleWhite fixed top-0 left-0 z-50 opacity-0 duration-200 pointer-events-none'}>
      <Spinner className={"h-20 w-20 text-red-500"}/>
    </div>
    </>
  )
}

export default Main
