import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser}) => {
    // creating a history for user i. e instance of history 
    const history = useHistory()
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    // login posts a request and sets login user 
    const login = () => {
        axios.post("https://whatapp-backend1.herokuapp.com/login", user)
        .then(res => {  
            alert(res.data.message)
            setLoginUser(res.data.user)
            history.push("/")
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div className="or"><p>OR</p></div>
            {/* it  */}
            <div className="ebutton" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login