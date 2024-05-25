import React, { useState, useEffect } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import Input from '../components/Input';
import { ContextAuth } from '../context/Context';
import axios from 'axios';
import { server } from '..';
import { Toaster, toast } from 'sonner';
import Spinner from '../components/Spinner';

const UpdateProfile = () => {
  const { account } = ContextAuth()
  console.log(account);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  useEffect(() => {
    setEmail(account?.email)
    setName(account?.name)
  }, [account])

  const [loading, setLoading] = useState(false)
  const handleUpdate = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      axios(`${server}/user/updateuser`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },

        data: {
          id: account?.id,
          name: name,
          email: email
        }
      })
        .then((response) => {
          if (response?.data?.success) {
            toast.success(response?.data?.message)
            setLoading(false)
            return
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false)
        })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-20 items-center px-5 py-5'>
      <div className='w-full h-32 bg-textBlue rounded-2xl p-5 relative'>
        <div className='flex justify-between items-center'>
          <Link to={'/profile'} className=' flex justify-center items-center'>
            <IoArrowBackCircle className='text-lightWhite text-4xl' />
          </Link>
          <h1 className='w-full h-max text-center text-2xl font-bold text-lightWhite'>Update Profile</h1>
          <IoArrowBackCircle className='text-textBlue text-4xl' />
        </div>

        <div className='w-32 h-32 absolute top-16 left-1/2 -translate-x-1/2 profileShadow border border-white flex justify-center items-center rounded-full bg-white/20 backdrop-blur-md'>
          <img className='rounded-full w-24 h-24 object-cover ' src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1708616418~exp=1708620018~hmac=3b75c8218eacf33885cf4a1a37736fa8857b02bd0684d953fb3f410559cb711a&w=900" alt="" />
        </div>
      </div>

      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col items-center'>
          <h1 className='font-medium text-xl'>{account?.name}</h1>
          <p className='text-textGray'>{account?.email}</p>
        </div>
        <div className='w-full flex flex-col gap-8'>
          <div className='w-full flex flex-col gap-5'>
            <Input value={name} onChange={(e) => {
              setName(e.target.value)
            }} icon={<FaRegUser className='text-textGray ' />} type={'text'} placeholder={'Name'} />
            <Input value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} icon={<MdMailOutline className='text-textGray ' />} type={'text'} placeholder={'Email'} />
            <Input icon={<FaRegUser className='text-textGray ' />} type={'text'} placeholder={'Username'} />
          </div>
          {/* <Button text={'Update'} /> */}
          <button onClick={handleUpdate} className='w-full text-center p-4 bg-textBlue text-purpleWhite font-medium rounded-2xl'>{
          loading ? <Spinner className={'w-6 h-6'}/> : "Update"
          }</button>
        </div>
      </div>
<Toaster richColors position='top-center'/>
    </div>
  )
}

export default UpdateProfile
