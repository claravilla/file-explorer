import { Schema, model } from "mongoose";

// ---- Folders ----

interface FolderSchemaType {
  folderName: string;
  parentFolder: string;
  path: string;
  folderChildren: string[];
  files: string[];
}

const FolderSchema = new Schema<FolderSchemaType>({
  folderName: { type: String, required: true, unique: true },
  parentFolder: String,
  path: String,
  folderChildren: [String],
  files: [String],
});

export const FoldersList = model("FoldersList", FolderSchema);

// ---- Files ----

interface FileSchemaType {
  name: string;
  source: Buffer;
}

const FilesSchema = new Schema<FileSchemaType>({
  name: { type: String, required: true, unique: true },
  source: Buffer,
});

export const FileList = model("FileList", FilesSchema);
