import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import axios from 'axios';
import QuestionAnswerPage from './QuestionAnswerPage';
import Button from '../components/Button';
import { Toaster, toast } from 'sonner';
import { ContextAuth } from '../context/Context';
import { server } from '..';

const YourStory = () => {
  const [files, setFiles] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState(false); // State to track if files were uploaded successfully
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([]);
  const [query, setQuery] = useState('');
  // const [charname, setCharName] = useState([])
  const { setChar } = ContextAuth()





  const navigate = useNavigate()


  const { account } = ContextAuth()

  const handleStory = async (charname) => {
    // console.log(charname);
    try {
      axios(`${server}/userstory/story`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          story: story,
          userId: account?.id,
          charname: charname,
          imageurl:'',
          title:''


        }
      }).then((response) => {
        console.log(response.data);
        toast.success(response?.data?.message)
        console.log(response?.data?.createStoryObj?.id);
        navigate(`/chat/${response?.data?.createStoryObj?.id}`)
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






  const handlePythonApi = async () => {
    setLoading(true)
    try {
      //pyhton url
      await axios.post('http://192.168.0.105:8080/uploadpdftext', { text: story }, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log(res);
        handleStory(res?.data?.names)

        if (res?.data?.names.length > 0) {
          setChar(res?.data?.names)
          // setCharName(res?.data?.names)
        }
        else {
          toast.warning("No Characters Present")
        }



        setLoading(false)
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
  };






  return (
    <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-5 p-7'>
      <div className='w-full flex justify-between items-center'>
        <Link to={'/uploadStory'} className=' flex justify-center items-center'>
          <IoArrowBackCircle className='text-textBlue text-4xl' />
        </Link>
        <h1 className='w-full h-max text-center text-2xl font-bold text-textBlue'>Your Story</h1>
        <IoArrowBackCircle className='text-lightWhite text-4xl' />
      </div>

      <div className=' flex flex-col justify-between gap-4 h-screen'>
        <textarea name="" id="" value={story} className='resize-none w-full h-full rounded-xl outline-none border-2 bg-white px-4 py-4' placeholder='Add Your Story ' onChange={(e) => {
          setStory(e.target.value)

        }} />

        <Button type='button' text={loading ? 'Uploading' : 'Upload'} onClick={handlePythonApi} />
      </div>



      {/* <h1>Upload Files</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {filesUploaded && <QuestionAnswerPage filesUploaded />} {/* Conditionally render the question and answer page if filesUploaded is true */}
      {/* <Link to={'/selectCharacter'} className='fixed z-50 bottom-7 right-7'>
        <SiGooglemessages className='text-5xl rounded-full text-textBlue bg-white  iconShadow' />
      </Link> 
       */}


      <Toaster richColors position='top-center' />
    </div>
  )
}

export default YourStory
