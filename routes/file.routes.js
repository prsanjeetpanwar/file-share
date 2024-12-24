import express from "express";
import { FileShare } from "../controllers/file.controllers.js";

const FileRouter=express.Router();


FileRouter.post('/',FileShare)


export default FileRouter