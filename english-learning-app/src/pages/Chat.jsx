import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import axios from 'axios';
import { ContextAuth } from '../context/Context';
import { Toaster, toast } from 'sonner';
import { server } from '..';
import { useParams } from "react-router-dom";
import { IoMdMic, IoMdMicOff } from "react-icons/io";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Chat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [query, setQuery] = useState('');
  const { char } = ContextAuth();
  const [charname, setCharName] = useState('');
  const chatContainer = useRef();
  const [gender, setGender] = useState('')

  const [story, setStory] = useState('')

  const [params, setParams] = useSearchParams()
  const type = params.get('type')
  const { id } = useParams();


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
        // console.log(response?.data?.findstory);
        setChatHistory(response?.data?.findstory?.chats);
        // setCharName(response?.data?.charname[0])
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



  const handleChatUpdateExpress = (isUser, text) => {

    console.log(text)

    try {
      axios(`${server}/userstory/updatestory`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },

        data: {
          id: story?.id,
          text: text,
          charname: isUser ? 'You' : charname,
          isUser: isUser
        }
      })
        .then((response) => {
          if (response?.data?.success) {
            toast.success(response?.data?.message)
            // setChatHistory(  [...chatHistory, { query, Sender: 'other', name: "You" }, { query: response.data.response, Sender: response.data.Sender, name: response.data.Charname }]);
            return
          }
        }).catch((err) => {
          console.log(err);

        })
    } catch (error) {
      console.log(error);
    }
  }







  const handleChatSubmit = async () => {
    if (query?.length > 1) {

      setChatHistory([...chatHistory, { query, Sender: 'other', name: "You" }]);
      handleChatUpdateExpress(true, query);

      try {
        if (query?.toLowerCase() === "thank you" || query?.toLowerCase() === "thanks") {
          setChatHistory([...chatHistory, { query, Sender: 'other', name: "You" }, { query: "You're welcome!", Sender: `Bot`, name: `${charname}` }]);
        } else {
          //pyhton url
          const response = await axios.post('http://192.168.0.105:8080/chat', {
            question: charname ? `Chat as if you were ${charname} from story and respond to the question  ${query} in short` : `${query} in short`,
            charname: charname
          })

          // handleConvert(response.data.response)
          handleAudio(response.data.response)

          // speak1(response.data.response)
          // speakText(response.data.response)
          setChatHistory([...chatHistory, { query, Sender: 'other', name: "You" }, { query: response.data.response, Sender: response.data.Sender, name: response.data.Charname }]);
          handleChatUpdateExpress(false, response.data.response)


        }

        setQuery('');

      } catch (error) {
        console.log(error);
      }
    }
    else {
      toast.warning('Please Enter Question...')
    }



  };


  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight
    }
  }, [chatHistory]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleChatSubmit();
    }
  };

  
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);
  // console.log((prevPath));




  // Gender Detection
  const genderDetection = async () => {
    await axios.get(`https://api.genderize.io?name=${charname}`).then((res) => {
      console.log(res?.data?.gender);
      setGender(res?.data?.gender)
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    genderDetection()
  }, [charname])






  //gcp

  const handleAudio = async (text) => {
    
    const endpoint = `https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize?key=${"Your Google Cloud API Key"}`
    const payload =
    {
      "audioConfig": {
        "audioEncoding": "MP3",
        "effectsProfileId": [
          "small-bluetooth-speaker-class-device"
        ],
        "pitch": 0,
        "speakingRate": 1
      },
      "input": {
        "text": text
      },
      "voice": {
        "languageCode": "en-IN",
        "name":  gender == 'male' ? 'en-IN-Neural2-C' : 'en-IN-Neural2-D'
      },





    }



    try {
      await axios.post(endpoint, payload).then((res) => {
        // console.log(res?.data);
        // const audio= `data:audio/mp3;based64,${res?.data?.audioContent}`
        // setAudioUrl(res?.data?.audioContent)
        const audio = new Audio();
        audio.src = "data:audio/mpeg;base64," + res?.data?.audioContent; // Assuming res.data.audioContent contains the base64-encoded audio content
        audio.play();
      })
    } catch (error) {
      console.log(error);
    }

  }







  // Speech to text
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!transcript) return;
    setQuery(transcript);
  }, [transcript]);

  const handleKeyDown1 = (event) => {
    if (event.key === 'Enter') {
      handleChatSubmit();
    }
  };

  const handleChatSubmit1 = () => {
    // Your submit logic here
    console.log("Submitted query:", query);
  };

  const askMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone permission granted");
      setIsListening(true); // Start speech recognition after permission is granted
    } catch (error) {
      console.error("Error accessing microphone:", error);
      // Handle errors or show a message to the user
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      // askMicrophonePermission();
      SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };


  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  // const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  return (
    <div>

      {/* <button onClick={() => {
        handleAudio("hello every one")
      }}>
        text
      </button> */}
      <div className='h-screen w-screen bg-purpleWhite flex flex-col gap-5 items-center px-7  '>
        <div className='w-full fixed bg-white pt-3 pb-3'>
          <div className='mx-4 flex justify-between items-center ' >
            <button onClick={handleClick} className='flex justify-center items-center'>
              <IoArrowBackCircle className='text-textBlue text-4xl' />
            </button>
            <h1 className='w-full h-max text-center text-2xl font-bold text-textBlue'>Chat with {charname}</h1>
            <IoArrowBackCircle className='text-lightWhite text-4xl' />
          </div>
          {/* <div className='flex  gap-x-5 mt-2 justify-center'>
            {story?.charname?.map((value, index) => (
              <div key={index} className=''>
                <button type="button" onClick={() => setCharName(value)} className='px-3 py-1.5 bg-textBlue rounded-md text-white'>
                  {value}
                </button>
              </div>
            ))}
          </div> */}

          <div className='flex  gap-x-5 mt-2 justify-center'>
            {[...new Set(story?.charname?.map(name => name?.toLowerCase()))].map((value, index) => (
              <div key={index} className=''>
                <button type="button" onClick={() => setCharName(value)} className='capitalize px-3 py-1.5 bg-textBlue rounded-md text-white'>
                  {value}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full h-screen flex flex-col justify-between mt-28'>
          <div className='w-full grid gap-2 max-h-[95vh] overflow-y-auto' ref={chatContainer}>
            {/* Render chat history */}
            {
              chatHistory.map((message, index) => (
                <div key={index}>
                  <p className={`${message.Sender ? message.Sender === 'other' ? 'text-right' : 'text-left' : message.isUser ? 'text-right' : 'text-left'} `}>
                    {message?.name || message?.charname}
                  </p>
                  <div className={`${message.Sender ? message.Sender === 'other' ? 'justify-end ' : 'justify-start' : message.isUser ? 'justify-end ' : 'justify-start'} flex`}>
                    <div className={` ${message.Sender === 'other' || message.isUser ? 'border text-right self-end w-fit rounded-b-2xl rounded-l-2xl bg-white' : ' rounded-b-2xl rounded-r-2xl self-start bg-textBlue text-lightWhite w-fit'} px-5 py-4 boxShadow `}>
                      <p >{message.query ? message.query === "Answer is not available in the context" ? "Didn't understand your question" : message.query : message.text === "Answer is not available in the context" ? "Didn't understand your question" : message.text}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='flex gap-3 sticky my-8 bottom-0 bg-white w-full items-center'>
            <div className='w-full'>

              <input
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => resetTranscript()}
                value={query}
                onKeyDown={handleKeyDown1}
                required
                className='w-full bg-lightWhite px-5 py-4 outline-none boxShadow rounded-xl '
                type="text"
                placeholder='Type your message...'
              />
            </div>


            <div className='  rounded-xl flex flex-col gap-y-2 justify-center items-center'>
              <div className="btn-style bg-textBlue p-2  rounded-full h-12 w-12  flex items-center justify-center">
                <button onClick={toggleListening}>
                  {isListening ? <IoMdMic className='text-lightWhite  text-2xl' /> : <IoMdMicOff className='text-lightWhite  text-2xl' />}
                </button>
              </div>
              <div className='bg-textBlue p-2  rounded-full h-12 w-12  flex items-center justify-center'>

                <button onClick={handleChatSubmit}>
                  <LuSend className='text-lightWhite  text-2xl ' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position='top-center' />
    </div>
  );
};

export default Chat;
