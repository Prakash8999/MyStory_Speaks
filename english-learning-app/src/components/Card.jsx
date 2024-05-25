import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <Link to={'/story'} className='w-full bg-lightWhite rounded-2xl boxShadow'>
      <img className='h-52 w-full rounded-t-2xl' src="https://img.freepik.com/free-photo/landscape-body-water_198169-128.jpg?t=st=1708761712~exp=1708765312~hmac=f1fe11b068dd81d3dfe89e944be49e37aad1f126ba479962a9bb294b466a567d&w=900" alt="" />
      <h1 className='py-3 px-2 text-lg font-medium text-center'>Reflections Beneath the Forest Canopy</h1>
    </Link>
  )
}

export default Card
