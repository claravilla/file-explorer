import express from "express";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDB } from "./db/Database";
import { folderRoutes } from "./src/routes/FolderRoutes";
import { fileRoutes } from "./src/routes/FileRoutes";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
connectDB();

app.use(
  cors({
    origin: [process.env.ORIGIN as string, "http://localhost:3000"],
  })
);

app.use(fileUpload());

app.use("/folder", folderRoutes);
app.use("/file", fileRoutes);

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
