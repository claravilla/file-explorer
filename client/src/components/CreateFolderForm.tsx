import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function CreateFolderForm({ parentFolder }: { parentFolder: string }) {
  const [folderName, setFolderName] = useState<string>("");
  const [isCreatingFolder, setIsCreatingFolder] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleOnChange = (event: any) => {
    setFolderName(event.target.value);
  };

  const onSubmit = async (e: any) => {
    try {
      setErrorMessage("");
      setIsCreatingFolder(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/folder/create`,
        {
          folderName: folderName,
          parentFolder: parentFolder,
        },
        {
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 500,
        }
      );
      setFolderName("");
      setIsCreatingFolder(false);
      navigate(0);
    } catch (error) {
      setErrorMessage(`Folder creation failed, error: ${error}`);
      setFolderName("");
      setIsCreatingFolder(false);
    }
  };

  return (
    <article>
      {isCreatingFolder ? (
        <p>Creating your folder ...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <button className="custom-upload-button">Create New Folder</button>
          <input
            className="custom-upload-button"
            type="text"
            name="folderName"
            value={folderName}
            placeholder="Type your folder name"
            onChange={handleOnChange}
          ></input>
        </form>
      )}
      {errorMessage !== "" ? (
        <p className="error-message">{errorMessage}</p>
      ) : null}
    </article>
  );
}

export default CreateFolderForm;
