import { Logout } from "@mui/icons-material";
import React from "react";
import { useNavigate ,useLocation, useParams} from "react-router-dom";
import {useState,useEffect} from "react";

import Message from "../components/Message";
import { auth, db } from "../utils/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import HomeNav from "../components/HomeNav";

const comment = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const routeData =new URLSearchParams(search).get("id");
    console.log(routeData);


    function logOut(){
        navigate("/");
    }

    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);
  
    //Submit a message
    const submitMessage = async () => {
      //Check if the user is logged
    //   if (!auth.currentUser) return logOut();
  
    //   if (!message) {
    //     console.log(message);
    //     toast.error("Don't leave an empty message 😅", {
    //       position: toast.POSITION.TOP_CENTER,
    //       autoClose: 1500,
    //     });
    //     return;
    //   }
      const docRef = doc(db, "posts", routeData);
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
  
    //Get Comments
    const getComments = async () => {
      const docRef = doc(db, "posts", routeData);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setAllMessages(snapshot.data().comments);
      });
      return unsubscribe;
    };
  
    useEffect(() => {
      if (!routeData) return;
      getComments();
    }, [routeData]);





    return(
        <div >
        <HomeNav />
        <div className="w-9/12 fixed left-1/4 top-0" style={{backgroundColor: "#1E1E1E"}}>
            <div>
              <Message {...routeData}></Message>
              {/* <div className=" border bg-white p-8" style={{backgroundColor:"#0C0C0C", color:"white", border:"1px solid grey"}}>
                <div className="flex items-center gap-2">
                  <img src={avatar} className="w-10 rounded-full" />
                  <h2>{username}</h2>
                </div>
                <div className="py-4">
                  <p>{description}</p>
                </div>
                {children}
              </div> */}
            </div>
            
            <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message 😀"
            className="bg-gray-800 w-full p-2 text-white text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6" >
          <h2 className="font-bold" style={{color:"white"}}>Comments</h2>
          <div className="doubtContainer">
          {allMessage?.map((message) => (
            <div className="bg-white p-10 border-2" key={message.time} style={{backgroundColor:"#0C0C0C", color:"white"}}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2>{message.userName}</h2>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
      </div>
    )
}

export default comment;