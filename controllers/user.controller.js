import { userModel } from "../models/user.model.js";
import * as passFunctions from '../utils/genetarePassword.js'

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const existUsers = await userModel.find({ email })
        if (existUsers.length !== 0) {
            res.sendStatus(400);
            console.log("User Exists")
        }
        else {
            const salt = passFunctions.generateSalt();
            const hashedPassword = passFunctions.hashPass(password, salt)
            const user = new userModel({
                name,
                email,
                password: hashedPassword
            })
            await user.save();
            res.sendStatus(201);
        }

    } catch (err) {
        console.log(err);
    }
}

const login = () => {

}

export { register, login }