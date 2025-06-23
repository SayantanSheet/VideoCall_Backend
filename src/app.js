import express from 'express';
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from './controllers/socketManager.js';

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
//error handler for allow http requests or allow requests for any domain(cors)
app.use(cors()); 
app.use(express.json({ limit:"40kb"}));
app.use(express.urlencoded({ limit:"40kb", extended:true}));

app.use("/api/v1/users", userRoutes);

const start= async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://sayantansheet:sayantan123@cluster0.kjk6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to db");
    server.listen(app.get("port"),()=>{
        console.log("server started on port 8000");
    })
}

start();