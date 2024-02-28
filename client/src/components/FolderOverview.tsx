import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FolderDetailType } from "../types/types";
import ListElement from "./ListElement";

function FolderOverview({ setFolder }: { setFolder: Function }) {
  const [folders, setFolders] = useState<Array<FolderDetailType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/folder/`)
      .then((results) => {
        setFolders(results.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.error);
      });
  }, []);

  //get details of a specific folder

  const folderDetails = (folderName: string) =>
    folders.filter((folder) => {
      return folder.folderName === folderName;
    })[0];

  //create a ul of children of a folder

  const createChildrenList = (children: string[]) => {
    const childrenList = children.map<React.ReactNode>((child: string) => {
      return <ListElement name={child} icon="⊟" setFolder={setFolder} />;
    });
    const combinedChildrenList = childrenList.reduce((prev, curr) => [
      prev,
      curr,
    ]);

    return (
      <Fragment key={Math.random()}>
        <ul>{combinedChildrenList}</ul>
      </Fragment>
    );
  };

  if (folders.length > 0) {
    //get root Folder
    const rootFolder = folders.filter((folder: FolderDetailType) => {
      return folder.folderName === "root";
    })[0];

    //create a li item for each child of the root folder with a nested ul for all its children
    const rootFolderChildren = rootFolder.folderChildren.map<React.ReactNode>(
      (child) => {
        const details = folderDetails(child);
        if (details.folderChildren.length === 1) {
          return (
            <Fragment key={child}>
              <ListElement name={child} icon="⊟" setFolder={setFolder} />
              <ul>
                <ListElement
                  name={details.folderChildren[0]}
                  icon="⊟"
                  setFolder={setFolder}
                />
              </ul>
            </Fragment>
          );
        } else if (details.folderChildren.length > 1) {
          const childrenList = createChildrenList(details.folderChildren);
          return (
            <Fragment key={child}>
              <ListElement name={child} icon="⊟" setFolder={setFolder} />
              {childrenList}
            </Fragment>
          );
        } else {
          return <ListElement name={child} icon="⊟" setFolder={setFolder} />;
        }
      }
    );

    const rootFolderFileView = rootFolderChildren.reduce((prev, curr) => [
      prev,
      curr,
    ]);

    return (
      <article className="folders-overview">
        {isLoading ? (
          <p>Folder view is loading ...</p>
        ) : (
          <ul>
            <ListElement name="root" icon="⊟" setFolder={setFolder} />
            <ul>{rootFolderFileView}</ul>
          </ul>
        )}
        {errorMessage !== "" ? (
          <p>Something went wrong, please refresh the page</p>
        ) : null}
      </article>
    );
  } else {
    return <article>Is loading..</article>;
  }
}

export default FolderOverview;
