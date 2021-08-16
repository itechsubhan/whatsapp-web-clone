// imports for Login
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

// mongo db scema for the username and password
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

// app get for test on port 9000

app.get("/" , (req,res) =>{
    res.send("my api is working")
})

//Routes for login and registration 
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

// registering the users frontend sends a validated data that is a user schema object


app.post("/register", (req, res)=> {
    console.log(req.body)

    // we are taking the user out
    const { name, email, password} = req.body
    // finding if the user is already present in database
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            // creating a user object and storing the data
            const user = new User({
                name, //you can use name : name,
                email, // email : email,
                password //password : password
            })
            // checking if there occurs error in saving the data if db offline
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    //send the data
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})

// now go to frontend and work to implement the functionality