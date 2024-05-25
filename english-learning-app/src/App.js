import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Screen3 from './pages/Screen3';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Main from './pages/Main';
import Profile from './pages/Profile';
import SelectStory from './pages/SelectStory';
import Story from './pages/Story';
import SelectCharacter from './pages/SelectCharacter';
import Chat from './pages/Chat';
import UploadStory from './pages/UploadStory';
import YourStory from './pages/YourStory';
import UpdateProfile from './pages/UpdateProfile';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <>
      <Router>
        <ContextProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screen1" element={<Screen1 />} />
          <Route path="/screen2" element={<Screen2 />} />
          <Route path="/screen3" element={<Screen3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/selectStory" element={<SelectStory />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/selectCharacter" element={<SelectCharacter />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/uploadStory" element={<UploadStory />} />
          <Route path="/yourStory" element={<YourStory />} />
        </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
