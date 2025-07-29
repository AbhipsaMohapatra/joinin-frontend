
import './App.css'
import Navbar from './components/Navbar'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './components/Home';

function App() {
 

  return (
    <>
     {/* <div className='text-4xl'>Lets start</div> */}
     <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        
       </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
