import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";
import { FileList, FoldersList } from "../../db/DataModel";

export const fileRoutes = Router();

fileRoutes.post("/upload", async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files!).length === 0) {
      res.status(400).send({ error: `No file was provided` });
    } else {
      const file = req.files?.file as UploadedFile;
      const fileType = file.name.slice(file.name.indexOf(".") + 1);
      const allowedFileTypes = ["csv", "json", "geojson"];

      if (!allowedFileTypes.includes(fileType)) {
        res.status(400).send({ error: `File type not allowed` });
      } else {
        const existingFile = await FileList.findOne({ name: file.name });
        if (existingFile) {
          res
            .status(400)
            .send({ error: `A file with this name already exists` });
        } else {
          await FileList.create({
            name: file.name,
            source: file.data,
          });
          res.status(200).send("File successfully uploaded");
        }
      }
    }
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});

fileRoutes.post("/updateFolder", async (req: Request, res: Response) => {
  try {
    const { fileName, parentFolder } = req.body;
    await FoldersList.findOneAndUpdate(
      { folderName: parentFolder },
      { $push: { files: fileName } },
      { new: true }
    );
    res.status(200).send("File successfully uploaded");
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});

fileRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id: fileName } = req.params;
    const result = await FileList.findOne({ fileName: fileName });
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});
