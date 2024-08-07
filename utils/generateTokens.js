import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/token.model.js';

const createAccessToken = (user) => {
    const accessToken = jwt.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '20s' })
    return accessToken;
}

const createRefreashToken = async (user) => {
    try {
        const refreshToken = jwt.sign({ name: user.name, email: user.email }, process.env.REFRESH_TOKEN_KEY);
        const token = new tokenModel({
            value: refreshToken
        })
        await token.save();
        return refreshToken;
    } catch (err) {
        console.log(err)
    }

}

const createNewAccessToken = async (req, res) => {
    const { refreshToken } = req.body
    const isValid = await tokenModel.find({ value: refreshToken })
    if (isValid.lenght == 0) {
        return res.send(401);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        } else {
            const token = createAccessToken(user)
            res.json({ "New token": token });
        }
    })
}

export { createAccessToken, createRefreashToken, createNewAccessToken }