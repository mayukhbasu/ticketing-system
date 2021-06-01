import express from 'express';
import 'express-async-errors'
import { json } from "body-parser";
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import { app } from './app';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.AUTH_URI) {
        throw new Error('AUTH_URI must be defined');
    }
    try{
    await mongoose.connect(process.env.AUTH_URI, {
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