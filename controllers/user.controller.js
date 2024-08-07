import { userModel } from "../models/user.model.js";
import * as passFunctions from '../utils/generatePassword.js';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreashToken } from "../utils/generateTokens.js";



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

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = (await userModel.find({ email }))[0]

        if (user.length === 0) {
            console.log("Invalid mail")
        }

        const salt = user.password.split('$')[0];
        const validPass = passFunctions.compare(user.password, salt, password);

        if (validPass) {
            const accessToken = createAccessToken(user);
            const refreshToken = await createRefreashToken(user);
            res.json({ accessToken, refreshToken });
        } else {
            return res.sendStatus(401);
        }

    } catch (err) {
        console.log(err);
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(" ")[1]

    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }
        else {
            req.user = { name: user.name }
            next();
        }
    })

}


const protectedFunc = (req, res) => {
    console.log(req.user)
    res.send("Authorized User")
}

export { register, login, verifyToken, protectedFunc }