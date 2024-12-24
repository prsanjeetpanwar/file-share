import express from "express";
import dotenv from "dotenv"
import DatabaseDB from "./database/db.js";
import FileRouter from "./routes/file.routes.js";
import cors from "cors"
import bodyParser from "body-parser";
dotenv.config()


const app=express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('api/v1/file',FileRouter)

DatabaseDB()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})