
import './App.css'
import Navbar from './components/Navbar'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import MainPage from './components/MainPage';
import About from './components/About';
import Events from './components/Events';
import Login from './components/Login';
import SignUp from './components/SignUp'
import EventDesc from './components/ui/EventDesc';
import AboutMe from './components/ui/AboutMe';
import AI from './components/AiUi/AI';
import MyEvents from './components/ui/MyEvents';
import Footer from './components/Footer';
import AddEvent from './components/AddEvent';
import FeedBack from './components/FeedBack';


function App() {
 

  return (
    <>
     {/* <div className='text-4xl'>Lets start</div> */}
     <BrowserRouter>
     
      
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/eventdesc' element={<EventDesc/>}/>
        <Route path='/aboutme' element={<AboutMe/>}/>
        <Route path='/ai' element={<AI/>}/>
        <Route path='/myevents' element={<MyEvents/>}/>
        <Route path='/addevents' element={<AddEvent/>}/>
        <Route path='/feedback' element={<FeedBack/>}/>
        
       </Routes>
       <Footer/>
     </BrowserRouter>

    </>
  )
}

export default App
