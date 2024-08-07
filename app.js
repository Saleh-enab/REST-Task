import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

const dbURI = process.env.mongoURI;
const port = process.env.PORT || 3000;

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