import { Avatar,IconButton } from "@material-ui/core";
// import { AttachFile,InsertEmoticon,MoreVert,SearchOutlined } from "@material-ui/icons";   // here error was comming bcz of InsertEmoction Never used
import { AttachFile,MoreVert,SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import React,{ useState } from 'react';
import './Chat.css';
function Chat() {
    const [input,setInput] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>",input);
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
                <p className={`chat__message ${true && 
                "chat__reciever"}`}>
                <span className="chat__name">
                    Asgher
                    </span>
                    Hey Guys
                    <span className="chat__timestamp">3:52pm</span>
                </p>
                <p className="chat__message">
                    Hey Guys
                    <span className="chat__timestamp">3:52am</span>
                </p>
            </div>
            <div className="chat__footer">
                 <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
          
    );
}

export default Chat
