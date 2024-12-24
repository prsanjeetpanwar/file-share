import multer from "multer";
import path from "path";
import { v4 as uuid4 } from "uuid";
import fileSchema from "../models/file.js";

let storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'uploads'),
    filename: (req, file, callback) => {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExtension}`;
        callback(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 } 
}).single('file');

export const FileShare = async (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            return res.status(500).send({ error: "Internal server error" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        try {
            const file = new fileSchema({
                filename: req.file.filename,
                filePath: req.file.path,
                fileSize: req.file.size,
                uuid: uuid4(),
                sender: req.body.sender,
                receiver: req.body.receiver,
            });

            const response = await file.save();

            return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};
