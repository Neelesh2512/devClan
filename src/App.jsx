import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Register from './pages/Register'

function App() {

  return (
  <>
   <Navbar />
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  </>

  )
}

export default App
