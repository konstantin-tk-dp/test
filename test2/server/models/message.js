import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type:String,
        required:true
    },
    changedAt: {
        type:Date,
        required:true
    },
    action: {
        type:String,
        required:true
    },
})

const Message = mongoose.model('Message', messageSchema)

export default Message;