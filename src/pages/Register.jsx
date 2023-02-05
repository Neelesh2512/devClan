import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../pages/Css/Register.css';

const Register = () => {
    const [name, setName] =useState()
    const [email, setEmail] =useState()
    const [password, setPassword] =useState();

  const navigate = useNavigate();
  
  const loginHandler = () =>{
    navigate('/home')
  }

  return (
    <>
      <div className='min-h-screen flex justify-center items-center -mt-24 '>
          <div className='p-2 register_container '>
        <div className='flex flex-col gap-5 border p-16 rounded' style={{"backgroundColor":"#F9F4F0"}}>
          <h1 className='text-3xl font-bold'>Register</h1>
          <form className='flex flex-col gap-5'>
            <input className="p-3 border" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input className="p-3 border" placeholder='Enter Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="p-3 border" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='font-bold rounded bg-gray-800 p-4 text-white' onClick={loginHandler}>Sign-Up</button>
          </form>
        </div>
        </div>
      </div>
    </>
    
  )
}

export default Register