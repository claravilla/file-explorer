import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function UploadFileForm({ parentFolder }: { parentFolder: string }) {
  const [inputFile, setInputFile] = useState<File>();
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleFileSelection = (event: any) => {
    setInputFile(event.target.files[0]);
    submitUpload(event.target.files[0]);
    setInputFile(undefined);
  };

  const submitUpload = async (inputFile: File) => {
    if (!inputFile) {
      alert("Please select a file");
      return;
    }
    const fileType = inputFile.name.slice(inputFile.name.indexOf(".") + 1);
    const allowedFileTypes = ["csv", "json", "geojson"];
    if (!allowedFileTypes.includes(fileType)) {
      setErrorMessage(`File type ${fileType} is not allowed`);
      setIsFileUploading(false);
      setInputFile(undefined);
      return;
    }
    const formData = new FormData();
    formData.append("file", inputFile);
    try {
      setErrorMessage("");
      setIsFileUploading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/file/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 500,
        }
      );
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/file/updateFolder`,
        {
          fileName: inputFile.name,
          parentFolder: parentFolder,
        },
        {
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 500,
        }
      );
      setInputFile(undefined);
      setIsFileUploading(false);
      navigate(0);
    } catch (error: any) {
      setErrorMessage(`Upload failed, error: ${error}`);
      setIsFileUploading(false);
    }
  };

  return (
    <article>
      {isFileUploading ? (
        <p>Uploading...</p>
      ) : (
        <label className="custom-upload-button">
          Upload File
          <input type="file" name="file" onChange={handleFileSelection} />
        </label>
      )}

      {errorMessage !== "" ? (
        <p className="error-message">{errorMessage}</p>
      ) : null}
    </article>
  );
}

export default UploadFileForm;
