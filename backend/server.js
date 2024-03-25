import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/conectDB.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import { app, server } from './socket/socket.js'

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import messageRouter from './routes/message.routes.js';
import job from './cron/cron.js';


dotenv.config();
connectDb();
job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
server.listen(PORT, () => {
    console.log('App is running on the PORT no: ', PORT);
});