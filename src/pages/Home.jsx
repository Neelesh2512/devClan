import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import '../pages/Css/Home.css';
import Feed from "../pages/Feed";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {auth,db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect,useState} from "react";
import {addDoc,collection,serverTimestamp,onSnapshot, orderBy, query,arrayUnion,
    doc,
    getDoc,
    updateDoc,} from "firebase/firestore";
import HomeNav from "../components/HomeNav";

const Home = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [post, setPost] = useState({ description: "" });
    const [allPosts, setAllPosts] = useState([]);
    const [isDoubt, setIsDoubt] = useState();
    const [doubtsData, getDoubtsData] = useState();

    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);
    function login(){
        navigate("/home");
    }

    //Submit a message
    const submitMessage = async () => {
        //Check if the user is logged
        if (!auth.currentUser) return login();
    
        // if (!message) {
        //   console.log(message);
        //   toast.error("Don't leave an empty message 😅", {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 1500,
        //   });
        //   return;
        // }
        const docRef = doc(db, "posts", post.id);
        await updateDoc(docRef, {
          comments: arrayUnion({
            message,
            avatar: auth.currentUser.photoURL,
            userName: auth.currentUser.displayName,
            time: Timestamp.now(),
          }),
        });
        setMessage("");
      };
    

    const submitPost = async (e) => {
        e.preventDefault();
        if (isDoubt === 'doubt') {
            const { description } = post;
            const collectionRef = collection(db, "doubt");
            await addDoc(collectionRef, {
                text: description,
                timestamp: serverTimestamp(),
                userId: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });

        } else {
            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,

            });
        }

        setPost({ description: "" });
        return login();
      };
      console.log(user);
    return (
        <>
            <div className="content_container" style={{backgrounfColor:"red"}}>
                <HomeNav />
                    <div className="fixed left-1/4 top-0 w-3/4" style={{backgroundColor:"#1E1E1E"}}>
                        <div className="flex flex-col gap-0 pb-32" style={{ minWidth: '60%', backgroundColor:"#1E1E1E" }}>
                            <form onSubmit={submitPost} className="p-5 mb-3 flex flex-col gap-3 formContainer" style={{"backgroundColor":"#1E1E1E", }}>
                                <div style={{color:"white", backgroundColor:"#1E1E1E"}}>
                                    <lable className="font-bold pr-4 text-xl">Post</lable>
                                    <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} className="w-full p-3 mt-3 h-20 rounded" style={{color:"black"}} placeholder="Start Sharing your thoughts...."></textarea>
                                    <div className="flex gap-4">
                                        <label className="font-bold">Doubt</label>
                                        <input type='radio' name='doubt' value='doubt' onChange={(e) => setIsDoubt(e.target.value)} />
                                        <label className="font-bold">Post</label>
                                        <input type='radio' name='doubt' value='post' onChange={(e) => setIsDoubt(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                <Button type="submit" variant="contained">Submit</Button>
                                </div>
                            </form>     
                        </div>
                        <Feed />
                    </div>
            </div>
        </>
    )
}

export default Home