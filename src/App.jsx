
import './App.css'
import Navbar from './components/Navbar'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import MainPage from './components/MainPage';
import About from './components/About';
import Events from './components/Events';
import Login from './components/Login';
import SignUp from './components/SignUp'

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
        
       </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
