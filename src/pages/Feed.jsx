import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import '../pages/Css/Home.css';

import Button from '@mui/material/Button';
import {auth,db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect,useState} from "react";
import {collection,
        onSnapshot, 
        orderBy, 
        query,
        doc,
        getDoc,
        updateDoc,} from "firebase/firestore";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



const Feed = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [post, setPost] = useState({ description: "" });
    const [allPosts, setAllPosts] = useState([]);
    const [isDoubt, setIsDoubt] = useState();
    const [doubtsData, getDoubtsData] = useState();


    const getDoubts = async () => {
        const collectionRef = collection(db, "doubt");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            getDoubtsData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    };

    // const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);
    function login(){
        navigate("/home");
  }
  
    
    //Get Comments
    const getComments = async () => {
      const docRef = doc(db, "posts", routeData.id);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setAllMessages(snapshot.data().comments);
      });
      return unsubscribe;
    };
  
    useEffect(() => {
      if (!navigate.isReady) return;
      getComments();
    }, [navigate.isReady]);                 

    const getPosts = async () => {
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    };

    useEffect(() => {
        getPosts();
        getDoubts();
    }, []);

    function logOut(){
        navigate("/");
    }

      if(loading) return;
      if(!user) return logOut();

    const chatRouter = (id) => {
        navigate(`/chat?id=${id}`);
    }

    const commentRouter = (id) => {
        navigate(`/comment?id=${id}`);
    }

 
    return (
        <>
        <Tabs className="fixed left-1/4 top-1/3 w-3/4">
            <TabList className="flex items-center" style={{color: "#3700B3"}}>
                <Tab className="p-5 rounded hover:bg-purple-800 hover:bg-opacity-10">Posts</Tab>
                <Tab className="p-5 rounded hover:bg-purple-800 hover:bg-opacity-10" >Doubts</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                {/* POSTS */}
                    <div className="content_Container">
                        <div className="px-3 py-2" style={{backgroundColor: "#1E1E1E"}}>
                                <div className="doubtContainer" style={{backgroundColor:"#0C0C0C"}}>
                                    {allPosts.map((post) => (
                                        <Message key={post.id} {...post}>
                                            <div className="p-5 text-bottom"    >
                                            <Button className="pt-10" onClick={()=>commentRouter(post.id)} variant="contained" style={{marginLeft:"10px"}}>Comment</Button>
                                            <div className="text-right">
                                            ( {post.comments?.length > 0 ? post.comments?.length : 0} comments )
                                            </div>
                                            </div>
                                        </Message>
                                    ))}
                                </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                {/* Doubts */}
                    <div className=" px-3 py-2" style={{backgroundColor: "#1E1E1E"}}>
                            <div className="doubtContainer" style={{backgroundColor:"#0C0C0C"}}>
                                {doubtsData?.map((doubt) => {
                                    const { avatar, text,id, username} = doubt;
                                        console.log(doubt);
                                    return (
                                        <div className=" p-2 " style={{backgroundColor:"#0C0C0C", color:"white", border:"1px solid grey"}}>
                                            <div className="p-4 ">
                                                <div className="flex items-center">
                                                    <img className='rounded-full m-1' style={{ width: "40px" }} src={avatar} />
                                                    <h1>{username}</h1>
                                                </div>
                                                <h1 className="ml-3 p-3">{text}</h1>
                                            </div>
                                            <div className="p-5 flex gap-3">
                                                <Button onClick={()=>chatRouter(id)} variant="contained">Chat</Button>
                                                <Button href="https://meet.new" variant="outlined" color="success">Video</Button>
                                                </div>
                                            </div>
                                    )
                                })}
                            </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>

        </>
    )

}

export default Feed