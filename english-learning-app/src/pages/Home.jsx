import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

	useEffect(() => {
	  const timeout = setTimeout(() => {
		navigate("/screen1")
	  }, 3000);
	}, [])
	
	return (
		<div className='h-screen w-screen bg-purpleWhite flex flex-col gap-7 justify-center items-center p-7'>
			<div className='flex flex-col gap-1'>
				<h1 className='text-4xl font-bold text-textBlue'>MyStory Speak's</h1>
				<p className='text-xl text-textGray'>Innovative English Learning App</p>
			</div>
			<img className='w-52' src="/assets/starting.svg" alt="" />
			<Link to={"/screen1"} className='text-2xl text-center font-medium text-textBlue'>Elevate Your Learning Experience Today</Link>
		</div>
	)
}

export default Home
