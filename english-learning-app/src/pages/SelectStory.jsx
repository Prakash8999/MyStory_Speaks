import React, { useEffect, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { easystory } from '../components/StoryData';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { ContextAuth } from '../context/Context';
import { useSearchParams } from 'react-router-dom';
import { server } from '..';
const SelectStory = () => {
  const [story, setStory] = useState([])
  const [loading, setLoading] = useState(false)
  const [charname, setCharName] = useState([])



  const [params, setParams] = useSearchParams()
  const type = params.get('type')

  // const { setChar } = ContextAuth()


  const navigate = useNavigate()


  const { account } = ContextAuth()

  const handleStory = async (story, imageurl, title, charname) => {
    // console.log(charname);
    try {
      axios(`http://localhost:3001/userstory/story`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          story: story,
          userId: account?.id,
          charname: charname,
          imageurl: imageurl,
          title: title,
          isPredefined: true


        }
      }).then((response) => {
        console.log(response.data);
        toast.success(response?.data?.message)
        console.log(response?.data?.createStoryObj?.id);
        // navigate(`/chat/${response?.data?.createStoryObj?.id}`)
        // if (response?.data?.success) {

        //   console.log(response);
        // }
      }).catch((err) => {
        toast.error(err?.message)
        console.log(err);
        setLoading(false)
      })
    } catch (error) {
      console.log(error);
    }
  }



  const fetchStory = async () => {
    try {
      await axios(`${server}/userstory/getstory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {
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



  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-5 items-center p-7 '>
      <div className='w-full flex justify-between items-center'>
        <Link to={'/main'} className=' flex justify-center items-center'>
          <IoArrowBackCircle className='text-textBlue text-4xl' />
        </Link>
        <h1 className='w-full h-max text-center text-2xl font-bold text-textBlue'>Select Story</h1>
        <IoArrowBackCircle className='text-lightWhite text-4xl' />
      </div>

      <div className='w-full h-max overflow-y-auto grid gap-5 pb-5'>

        {
          story?.filter(value => value?.type == type && value?.isPredefined).map((value, index) => {
            return (
              <Link to={`/story/${value?.id}?type=${type}`} key={index} className=' w-full bg-lightWhite rounded-2xl boxShadow'>
                <div>
                  <img src={value?.imageurl} alt="" srcSet="" className='h-52 w-full rounded-t-2xl object-cover' />
                </div>

                <p className='py-3 px-2 text-lg font-medium text-center'>
                  {
                    value?.title
                  }
                </p>

                {/* <button className=' text-center bg-textBlue h-10 text-white px-4 rounded-md shadow-md'>
  Open Story
</button> */}
              </Link>

            )
          })
        }

      </div>
      <Toaster richColors position='top-center' />
    </div>
  )
}

export default SelectStory
