import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import Button from '../components/Button';
import axios from 'axios';
import { server } from '..';

const UploadStory = () => {
  const [page, setPage] = useState("upload");

  const [story, setStory] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const fetchStory = async () => {
    try {
      await axios(`${server}/userstory/getstory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {
        // console.log(response?.data?.findstory);
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
        navigate(`/chat/${id}`)
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
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-5 items-center p-7 '>
      <div className='w-full flex justify-between items-center'>
        <Link to={'/main'} className='flex justify-center items-center'>
          <IoArrowBackCircle className='text-textBlue text-4xl' />
        </Link>
        <h1 className='w-full h-max text-center text-2xl font-bold text-textBlue'>Upload Story</h1>
        <IoArrowBackCircle className='text-lightWhite text-4xl' />
      </div>

      <div className='w-full grid gap-4'>
        <div className='flex justify-between gap-3 px-[6px] py-[6px] bg-white rounded-full boxShadow'>
          <div onClick={() => setPage("upload")} className={page == 'upload' ? 'w-full bg-textBlue px-4 py-3 rounded-full flex justify-center text-white  duration-200' : 'w-full bg-white px-4 py-3 rounded-full flex justify-center text-textBlue duration-200'}>
            <p className=''>Upload</p>
          </div>
          <div onClick={() => setPage("history")} className={page == 'history' ? 'w-full bg-textBlue px-4 py-3 rounded-full flex justify-center text-white duration-200' : 'w-full bg-white px-4 py-3 rounded-full flex justify-center text-textBlue duration-200'}>
            <p className=''>History</p>
          </div>
        </div>
        <div className={`${page == 'upload' ? 'block' : 'hidden'}`}>


          <h1 className='text-lg font-medium text-center'>Upload your story or text </h1>
          <div className='flex gap-3 mt-2'>
            <Button text={'Upload'} to={'/yourStory'} />
            {/* <a href="https://testllml.streamlit.app/">Upload</a> */}
          </div>
        </div>


        <div className={`${page == 'history' ? 'block' : 'hidden'}`}>


          <h1 className='text-lg font-medium text-center'>History </h1>



          <div className='grid grid-cols-1 gap-x-3 gap-y-6 w-full '>

            {
              story?.filter(value => !value?.isPredefined).map((value, index) => {
                return (
                  <div key={index} className='border shadow-md rounded-lg p-2'>

                    <p className='text-center'>
                      Story {index + 1}
                    </p>

                    <div className='w-full h-[40vh] overflow-hidden px-4 relative'>
                      <div>

                        {value?.story}

                      </div>
                      <div className='absolute bottom-0 w-full h-12 bg-white left-0 flex justify-center items-center'>

                        <button className=' text-center bg-textBlue h-10 text-white px-4 rounded-md shadow-md' onClick={() => {
                          handlePythonApi(value?.story, value?.id)
                        }} >
                          {loading ? `Opening Story ${index + 1}` : `Open Story ${index + 1}`}
                        </button>
                      </div>
                    </div>
                  </div>



                )
              })
            }




          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadStory
