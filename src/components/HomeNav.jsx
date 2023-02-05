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
        <div className="p-2 h-screen w-1/4 fixed top-0 left-0 overflow-x-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                    <Stack spacing={5} style={{ paddingTop: "10vh", display: "flex", alignItems: "center" }}>
                        <Button variant="text" style={{ width: "50%" }} onClick={() => navigate("/home")}>
                            <HomeRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Home</Button>
                        <Button variant="text" style={{ width: "50%" }}>
                            <SettingsSuggestRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Settings
                        </Button>
                        <Button variant="text" style={{ width: "50%" }} onClick={() => navigate("/profile")}>
                            <img style={{ border: "1px solid blue", borderRadius: "50%", width: "30px", marginRight: "10px"}} src={user.photoURL}  />
                            Profile
                        </Button>

                        <Button onClick={() => auth.signOut()} variant="contained">Sign out</Button>

                    </Stack>
        </div>
        </>
        
    )
}

export default HomeNav