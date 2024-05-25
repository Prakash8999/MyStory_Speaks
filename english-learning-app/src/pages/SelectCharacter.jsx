import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import Button from '../components/Button';

const SelectCharacter = () => {
  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-5 items-center px-5 py-7 '>
      <div className='w-full flex justify-between items-center'>
        <Link to={'/story'} className=' flex justify-center items-center'>
          <IoArrowBackCircle className='text-textBlue text-4xl' />
        </Link>
        <h1 className='w-full h-max text-center text-2xl font-bold text-textBlue'>Choose Character</h1>
        <IoArrowBackCircle className='text-lightWhite text-4xl' />
      </div>

     <div className='grid gap-4'>
      <h1 className='text-lg font-medium'>Choose a character with whom you wanna talk </h1>
      <div className='flex gap-3'>
        <Button text={'Luna'} to={'/chat'}/>
        <Button text={'Throne'} />
      </div>
     </div>
    </div>
  )
}

export default SelectCharacter
