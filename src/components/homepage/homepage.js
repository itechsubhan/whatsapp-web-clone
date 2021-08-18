import React, { useState } from "react"
import Sidebar from "./../Sidebar/Sidebar"
import Chat from "../Chat/Chat"
// import './App.css'
// import "../App.css"
// import Sidebar from "src\Sidebar.js"
// import Chat from "src\Chat.js"

// rendering imports
import{useEffect} from "react"
// import axios from "axios"
import axios1 from "axios"
import Pusher from "pusher-js"

const Homepage = ({setLoginUser}) => {
  // initially an empty array
  const [messages, setMessages ] = useState([]);

  useEffect( () => {
    // we are not getting op when we use /messages/sync
    axios1.get("http://localhost:9002/messages/sync").then((response) => {
      setMessages(response.data);
    });
  } , [] );

  useEffect(() => {
    var pusher = new Pusher('3945dac4856112b7c22c', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert when user pushes the data
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    
      // third listner to unbind and make to re eun initial code and there are only one new listner

      return () => {
        channel.unbind();
        channel.unsubscribe();
      };

    })
} , [messages] );

console.log(messages)

  return (
    <div className="App">
      <div className="app__body">
      <Sidebar />
      {/* now we are rendering the messages by pasing the messages array into the chat bar component */}
      <Chat   messages = {messages} />
      {/* this above thing is where props come into picture */}
      <div className="button" onClick={() => setLoginUser({})} >Logout</div>
      </div> 
    </div>
  )
}
export default Homepage



/// for a sample sorry @subhan
// import React from "react"
// import "./homepage.css"

// const Homepage = ({setLoginUser}) => {
//     return (
//         <div className="homepage">
//             <h1>Hello Homepage</h1>
//             <div className="button" onClick={() => setLoginUser({})} >Logout</div>
//         </div>
//     )
// }

// export default Homepage