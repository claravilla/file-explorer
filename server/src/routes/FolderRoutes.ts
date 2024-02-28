import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { FoldersList } from "../../db/DataModel";

export const folderRoutes = Router();

folderRoutes.post("/create", async (req: Request, res: Response) => {
  const {
    folderName,
    parentFolder,
  }: { folderName: string; parentFolder: string | undefined } = req.body;
  try {
    const existingFolder = await FoldersList.findOne({
      folderName: folderName,
    });
    if (existingFolder) {
      res.status(400).send({ error: "A folder with this name already exists" });
    } else {
      let path: string;
      if (parentFolder) {
        const result = await FoldersList.findOne({
          folderName: parentFolder,
        });

        path = `${result?.path}/${folderName}`;
      } else {
        path = `/${folderName}`;
      }
      await FoldersList.create({
        folderName: folderName,
        parentFolder: parentFolder,
        path: path,
      });
      // do not want to update the parent if the folder fails to create
      if (parentFolder) {
        await FoldersList.findOneAndUpdate(
          { folderName: parentFolder },
          { $push: { folderChildren: folderName } },
          { new: true }
        );
      }
      res.status(200).send("Folder successfully created");
    }
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});

folderRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const results = await FoldersList.find();
    res.status(200).send({ results });
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});

folderRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id: name } = req.params;
    const result = await FoldersList.findOne({ folderName: name });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: `Something went wrong, ${err}` });
  }
});
