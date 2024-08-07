import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})

const tokenModel = mongoose.model("Token", tokenSchema);

export { tokenModel }