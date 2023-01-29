import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

import { useNavigate } from "react-router-dom";
import {auth} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

const HomeNav = () => {

    const navigate = useNavigate();
    const [user,loading] = useAuthState(auth);
    function logOut(){
        navigate("/");
      }
      if(loading) return;
      if(!user) return logOut();
  
    //   const getData = async () => {
    //     if(loading) return;
    //     if(!user) return logOut();
    
    //   };

    //   useEffect (()=>{
    //     getData();
    //   },[user,loading]);

    return (
        <>
        <div style={{width: "25%",borderRight:"1px solid grey",position:"fixed",bottom:"0",height:"89vh"}}>
        <Stack spacing={5} style={{paddingTop:"10vh", display:"flex", alignItems:"center"}}>
            <Button variant="text" style={{width:"50%"}} onClick={()=>navigate("/home")}>
            <HomeRoundedIcon fontSize="large" style={{paddingRight:"10px"}}/>
            Home</Button>
            <Button variant="text" style={{width:"50%"}}>
            <SettingsSuggestRoundedIcon fontSize="large" style={{paddingRight:"10px"}} />
            Settings</Button>
            <Button variant="text" style={{width:"50%"}} onClick={()=>navigate("/profile")}>
            {/* <AccountCircleRoundedIcon fontSize="large" style={{paddingRight:"10px"}}/> */}
            <img style={{border:"1px solid blue", borderRadius:"50%", width:"30px",marginRight:"10px"}} src={user.photoURL} />
            Profile</Button>

            <Button onClick={()=>auth.signOut()} variant="contained">Sign out</Button>
        </Stack>
        </div>
        </>
        
    )
}

export default HomeNav