import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import Logo from '../assets/logo.png';

import '../pages/Css/Login.css';

const Login = () => {

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  function login() {
    navigate("/home");
  }

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, googleProvider);
      login();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      login();
    }
    else {
      console.log("login");
    }
  }, [user]);


  return (
    <>
      <div className='min-h-screen flex justify-center items-center -mt-24 ' style={{"backgroundColor": "#1E1E1E"}}>
        <div className='grid grid-cols-2 p-32'>
          <div className='p-8 flex gap-5 flex-col justify-center'>
            <img src={Logo} />
            {/* <h1 className='font-bold text-3xl' style={{color: "#3700B3"}}>Share your knowledge with your fellow Developers.</h1>
            <h1 className='text-xl font-bold' style={{color: "white"}}>Solve your doubt in 1:1 sessions</h1>
            <p className='text-lg' style={{color: "white"}}>Guide them, mentor them, help them change their lives. It's more satisfying than you think. And takes 2 minutes to get started</p> */}
          </div>
          <div className='p-12'>
            <div className='flex flex-col login_container gap-5 border p-16 rounded mt-20' style={{ "backgroundColor": "#F9F4F0" }}>
              <h1 className='text-3xl font-bold'>Sign in</h1>
              <form className='flex flex-col gap-5'>
                <input className="p-3 border" placeholder='Enter Email' />
                <input className="p-3 border" placeholder='Enter Password' type="password" />
                <button className='font-bold rounded bg-gray-800 p-4 text-white' style={{backgroundColor: "#3700B3"}}>Sign-in</button>
                <p className='text-center'>or</p>
                <Button className='rounded p-2 text-white' variant='outlined' type='button' onClick={GoogleLogin} style={{color: "#3700B3", borderColor:"#3700B3"}} >
                  Sign in with Google <GoogleIcon className='ml-5' />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Login