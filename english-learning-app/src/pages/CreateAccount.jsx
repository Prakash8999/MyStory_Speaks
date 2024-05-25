import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { LuEyeOff, LuEye } from "react-icons/lu";
import axios from 'axios';
import { server } from '..';
import { Toaster, toast } from 'sonner';
import Spinner from '../components/Spinner';

const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()





  // const handleStory = async (id) => {
  //   // console.log(charname);
  //   try {
  //     axios(`http://localhost:3001/userstory/stories`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       },
  //       data: {
  //         userId: id,
  //         stories: easystory 
  //       }

  //     }).then((response) => {
  //       console.log(response.data);
  //       toast.success(response?.data?.message)
  //       // console.log(response?.data?.createStoryObj?.id);

  //       // if (response?.data?.success) {

  //       //   console.log(response);
  //       // }
  //     }).catch((err) => {
  //       toast.error(err?.message)
  //       console.log(err);
  //       setLoading(false)
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }















  const handleSinup = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      axios(`${server}/auth/register`, {
        method: "POST",
        data: {
          name: name,
          email: email,
          password: password
        }
      }).then((response) => {
        console.log(response.data);
        // if (response?.data?.success) {
          toast.success(response?.data?.message + " Please login")


          // handleStory(response?.data?.userId?.id)
          navigate('/login')
          setLoading(false)
          return
        // }
        // else {
        //   toast.warning(response?.data?.message)
        //   setLoading(false)
        // }
      })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message)
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-7 justify-start items-center px-7 py-10'>
      <div>
        <img className='h-44 w-44' src="/assets/login.svg" alt="" />
      </div>

      <div className='flex flex-col gap-1'>
        <h1 className='text-4xl text-center font-bold text-textBlue'>Create Account</h1>
        <p className='text-lg text-center text-textGray'>Welcome!</p>
      </div>

      <form className='w-full grid gap-5' onSubmit={handleSinup}>
        <Input required icon={<MdMailOutline className='text-textGray ' />} type={"email"} placeholder={"Email"} value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} />
        <Input required icon={<FaRegUser className='text-textGray ' />} type={"text"} placeholder={"Name"} value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        <Input required icon={<MdLockOutline className='text-textGray  text-lg' />} type={viewPassword ? "text" : "password"} placeholder={"Password"} value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />
        {/* <button className='flex items-center gap-x-3 ' onClick={() => {
          setViewPassword(!viewPassword)
        }}>
          <p>
          {
            viewPassword ? <LuEye /> : <LuEyeOff />
          }
          </p>
          <p className='text-textBlue'>
            Show Password
          </p>
        </button> */}
        <Input required icon={<MdLockOutline className='text-textGray  text-lg' />} type={"text"} placeholder={"Confirm password"} value={confirmPassword} onChange={(e) => {
          setConfirmPassword(e.target.value)
        }} />

        <div className='w-full'>
          <button type='submit' className='w-full text-center p-4 bg-textBlue text-purpleWhite font-medium rounded-2xl '>

            {
              loading ? <Spinner className={'h-8 w-8'} /> : 'Sign Up'
            }

          </button>
        </div>
      </form>

      <div className='w-full'>
        <p className='text-base w-full text-center text-grayishBlue'>Already have an account? <Link to={"/login"} className='text-textBlue'>Login</Link></p>
      </div>
      <Toaster richColors position='top-center' />
    </div>
  )
}

export default CreateAccount
