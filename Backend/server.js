// imports for Login
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// importing databse Schema for messages
import Messages from "./dbMessages.js"
// pusher for realtime
// const Pusher = require("pusher"); //from the pusher docs
import Pusher from "pusher"

// middleware

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const pusher = new Pusher({
    appId: "1250731",
    key: "3945dac4856112b7c22c",
    secret: "275d7c84f7f849846d1a",
    cluster: "ap2",
    useTLS: true
  });
// database Configuration
mongoose.connect("mongodb+srv://subhan:subhan123@secretscluster.6l7wc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // video 
    useNewUrlParser :true
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

// database collection 2  of messages when opened we are sending the data 

const db = mongoose.connection;

db.once('open',()=>{
    console.log("DB 2 of messages connected")
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log(change)
        if(change.operationType==='insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            });
        }else{
            console.log("error triggering")
        }
    });
});
// app get for test on port 9002

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

// api routes of whatsapp
// get all rhe messages that are in the database
// for one room here
// on succesful response we need 100 to download 

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })

})
// then send new post requests for new messages 

app.post('/messages/new' , (req,res) => {
    const dbMessage = req.body 
    Messages.create(dbMessage,(err,data) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})
app.listen(9002,() => {
    console.log("BE started at port 9002")
})

// now go to frontend and work to implement the functionality