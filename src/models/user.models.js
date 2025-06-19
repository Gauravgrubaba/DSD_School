import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        school_id: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    }, {
        timestamps: true
    }
)

const User = mongoose.model("users", userSchema);

export default User;