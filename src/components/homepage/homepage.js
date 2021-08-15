import React from "react"
import Sidebar from "./../Sidebar/Sidebar"
import Chat from "../Chat/Chat"
// import './App.css'
// import "../App.css"
// import Sidebar from "src\Sidebar.js"
// import Chat from "src\Chat.js"
const Homepage = ({setLoginUser}) => {
  return (
    <div className="App">
      <div className="app__body">
      <Sidebar />
      <Chat />
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