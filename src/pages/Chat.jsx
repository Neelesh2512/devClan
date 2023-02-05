import React, {useState, useEffect} from 'react';
import '../pages/Css/Chat.css';
import {auth } from '../utils/firebase';

import { getFirestore } from 'firebase/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';

import ChatSideBar from '../components/ChatSideBar';
import ChatBox from '../components/ChatBox';

const Chat = () => {
    
    const [user,loading] = useAuthState(auth);
    const [userData, setUserData] = useState();

    useEffect(()=>{
        setUserData(user);
    },[user])


    return (<>
        <div className='min-h-screen flex justify-center items-center 'style={{"backgroundColor":"#F9F4F0"}}>
            <div className='-mt-32 gap-5 chatContainer rounded' style={{"backgroundColor":"#EEEEEE"}}>
                <ChatSideBar userData={userData} />
                <ChatBox userData={userData} />
            </div>
        </div>
        </>
    )
}

export default Chat