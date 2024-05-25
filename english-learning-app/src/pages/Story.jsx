import React, { useEffect, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { SiGooglemessages } from "react-icons/si";
import { FaMicrophoneAlt } from "react-icons/fa";
import axios from 'axios';
import { server } from '..';

const Story = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const type = params.get('type')

  const { id } = useParams();
  console.log(id);
  const [story, setStory] = useState('')



  const fetchStory = async () => {
    try {
      await axios(`${server}/userstory/readsinglestory/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {
        // console.log(response?.data?.findstory);
        // setStory(response?.data?.findstory)
        console.log(response?.data?.findstory);
        setStory(response?.data?.findstory)

      })
        .catch((err) => {
          console.log(err);
        })

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchStory()
  }, [])






  const handlePythonApi = async (story, id) => {
    setLoading(true)
    try {
      //pyhton url
      await axios.post('http://192.168.0.105:8080/uploadpdftext', { text: story }, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {

        console.log(res);
        setLoading(false)
        navigate(`/chat/${id}?type=${type}`)
      }).catch((err) => {
        alert(err.message)
        setLoading(false)
        console.log(err);
      })
    } catch (error) {
      alert('Something went wrong again')
      setLoading(false)
      console.log(error);
    }

  }

  return (
    <>
      <div className='bg-purpleWhite h-max-screen overflow-y-auto relative z-0'>
        <div className='relative'>
          <Link to={`/selectStory?type=${type}`} className='absolute top-7 left-7 flex justify-center items-center'>
            <IoArrowBackCircle className='text-lightWhite text-4xl' />
          </Link>
          <img className='h-[45vh] w-full object-cover' src={story?.imageurl} alt="" />
        </div>
        <div className='h-full px-7 pt-3 pb-16  grid gap-3 '>
          <h1 className='text-textBlue font-bold text-2xl'>{story?.title}</h1>
          <div className='text-justify'>
            {
              story?.story
            }
          </div>
        </div>
      </div>

      <div className='fixed z-50  bottom-7 right-7 grid gap-4'>
      
        <button onClick={() => {
          handlePythonApi(story?.story, story?.id)
        }} >
          <SiGooglemessages className='text-6xl rounded-full text-textBlue bg-white  iconShadow' />
        </button>


      </div>
    </>
  )
}

export default Story
