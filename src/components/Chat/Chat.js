import { Avatar,IconButton } from "@material-ui/core";
// import { AttachFile,InsertEmoticon,MoreVert,SearchOutlined } from "@material-ui/icons";   // here error was comming bcz of InsertEmoction Never used
import { AttachFile,MoreVert,SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import React,{ useState } from 'react';
import './Chat.css';
import axios from 'axios'
function Chat({ messages }) {
    const [input,setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        console.log("You typed >>>",input);
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        // axios second parameter is the data that is sent

        axios.post("https://whatapp-backend1.herokuapp.com//messages/new" , {
            message : input,
            name : "demo name" ,
            timestamp : dateTime,
            recieved: false
        })
        setInput("");
        // after the user send set input empty
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>    
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton> 
                </div>
            </div>
            <div className="chat__body">
            {/* at this point we need to check wether the name of the person is same so that we can attach the recieved and reciever class */}
            {messages.map((message) => (
                <p className={`chat__message ${message.recieved &&  "chat__reciever"}`}>
                <span className="chat__name">
                    {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                </p>
            ))}
            </div>
            <div className="chat__footer">
                 <InsertEmoticonIcon />
                <form>
                    <input value={input} 
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
          
    );
}

export default Chat
