import mongoose  from "mongoose";

// database schema for messages

const whatsappSchema = mongoose.Schema({
    message : String,
    name : String,
    timestamp : String,
    recieved:Boolean
})

// the name of the collection(table in sql ) is the 'messageContent
export default mongoose.model('messagecontent' , whatsappSchema )