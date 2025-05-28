import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneno: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Contacted", "Pending"],
            default: "Pending"
        },
        dateAndTime: {
            type: Date,
            default: () => new Date()
        }
    }, {
        timestamps: true
    }
)

const MessageSchema = mongoose.model("messageSchema", messageSchema);

export default MessageSchema;