import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    response: {
        type: String,
    },
});

export default mongoose.model("message", messageSchema);