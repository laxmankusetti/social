import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/conectDB.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import { app, server } from './socket/socket.js'

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import messageRouter from './routes/message.routes.js';


dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/messages', messageRouter);

server.listen(PORT, () => {
    console.log('App is running on the PORT no: ', PORT);
});