import React from "react";


const Message = ({ children, avatar, username, description }) =>{
    return (
        <div className=" border bg-white p-8" style={{backgroundColor:"#0C0C0C", color:"white", border:"1px solid grey"}}>
          <div className="flex items-center gap-2">
            <img src={avatar} className="w-10 rounded-full" />
            <h2>{username}</h2>
          </div>
          <div className="py-4">
            <p>{description}</p>
          </div>
          {children}
        </div>
      );
}

export default Message;