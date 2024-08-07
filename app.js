import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import userRouter from './routes/user.route.js';


const app = express();
const dbURI = process.env.mongoURI;
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/user', userRouter)


if (!dbURI) {
    console.log("DB Error: Database URI is not found")
} else {
    (async () => {
        try {
            await mongoose.connect(dbURI)
            app.listen(port, () => {
                console.log(`Connected successfully, Working on port ${port}`)
            })
        }
        catch (err) {
            console.log(err)
        }
    })();
}