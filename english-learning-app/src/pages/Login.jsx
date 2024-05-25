import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '..';
import { Toaster, toast } from 'sonner';
import Spinner from '../components/Spinner';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      axios(`${server}/auth/login`, {
        method: "POST",
        data: {
          email: email,
          password: password
        }
      }).then((response) => {
        console.log(response.data);
        toast.success(response?.data?.message)
        if (response?.data?.success) {
          localStorage.setItem("token", response?.data?.token)
          window.location.href = "/main"
          setLoading(false)
        }
      }).catch((err) => {
        toast.error(err?.message)
        console.log(err);
        setLoading(false)
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
        <h1 className='text-4xl text-center font-bold text-textBlue'>Login</h1>
        <p className='text-lg text-center text-textGray'>Welcome back!</p>
      </div>

      <form onSubmit={handleLogin} className='w-full grid gap-5'>
        <Input required value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} icon={<FaRegUser className='text-textGray ' />} type={"text"} placeholder={"Email"} />
        <div className='grid gap-2'>
          <Input
            required
            value={password}
            icon={<MdLockOutline className='text-textGray  text-lg' />} onChange={(e) => {
              setPassword(e.target.value)
            }} type={"text"} placeholder={"Password"} />
          <p className='text-base w-full text-right text-grayishBlue'>Forgot password?</p>
        </div>

        <div className='w-full '>
          <button type='submit' className='w-full  text-center p-4 bg-textBlue text-purpleWhite font-medium rounded-2xl '>
            {
              loading ? <Spinner className={'w-6 h-6'} /> : 'Login'
            }
          </button>
        </div>
      </form>



      <div className='w-full'>
        <p className='text-base w-full text-center text-grayishBlue'>Don't have an account? <Link to={"/createAccount"} className='text-textBlue'>Create Account</Link></p>
      </div>
      <Toaster richColors position='top-center' />
    </div>
  )
}

export default Login
