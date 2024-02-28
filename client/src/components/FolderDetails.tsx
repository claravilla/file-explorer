import { useEffect, useState } from "react";
import ListElement from "./ListElement";

import axios from "axios";
import BreadCrumbs from "./BreadCrumbs";
import { FolderDetailType } from "../types/types";

function FolderDetails({
  folderName,
  setFolder,
}: {
  folderName: string;
  setFolder: Function;
}) {
  const [folderDetails, setFolderDetails] = useState<FolderDetailType>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/folder/${folderName}`, {
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 500,
      })
      .then((result) => {
        setFolderDetails(result.data.result);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.error);
        setIsLoading(false);
      });
  }, [folderName]);

  return (
    <article className="folder-details">
      {isLoading ? (
        <p>Folder content is loading...</p>
      ) : (
        <>
          <BreadCrumbs
            path={folderDetails?.path as string}
            setFolder={setFolder}
          />
          <ListElement
            name={folderDetails?.folderName as string}
            icon="📁"
            setFolder={setFolder}
          />{" "}
          <ul>
            {folderDetails?.folderChildren.map((child: string) => {
              return (
                <ListElement name={child} icon={"📁"} setFolder={setFolder} />
              );
            })}

            {folderDetails?.files.map((file: string) => {
              return (
                <li key={file}>
                  <span className="tree-line"></span>📄{file}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {errorMessage !== "" ? (
        <p>Something went wrong, please refresh the page</p>
      ) : null}
    </article>
  );
}

export default FolderDetails;
