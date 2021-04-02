import express from 'express';
import 'express-async-errors'
import { json } from "body-parser";
import mongoose from 'mongoose';
import cookieSession from "cookie-session";


import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import {signupRouter} from "./routes/signup";
import { app } from './app';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    }catch(err) {
        console.log(err);
    }
    
}
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

start();