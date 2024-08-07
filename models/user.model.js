import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Invalid Email"]
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

const userModel = mongoose.model("User", userSchema);

export { userModel }