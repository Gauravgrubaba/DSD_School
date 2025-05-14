import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        school_id: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

// middleware
userSchema.pre('save', async function() {
    if(!this.isModified("password")) return

    await bcrypt.hash(this.password, 10);
    return
})

// method
userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(this.password, password);
}

const User = mongoose.model("users", userSchema);

export default User;