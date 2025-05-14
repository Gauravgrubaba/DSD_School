import User from "../models/user.models.js";

const handleUserlogin = async (req, res) => {
    const { school_id, password } = req.body;
    
    try {
        const userExist = await User.findOne({school_id: school_id});
        if(!userExist) {
            return res.status(404).json({
                response: "error",
                message: "User not found"
            })
        }

        const isPasswordValid = userExist.password === password;
        if(!isPasswordValid) {
            return res.status(404).json({
                response: "error",
                message: "Invalid password"
            })
        }

        return res.status(200).json({
            response: "success",
            data: {
                id: userExist.school_id
            }
        })
    } catch (error) {
        return res.status(404).json({
            response: "error",
            message: error
        })
    }
}

export {
    handleUserlogin
}