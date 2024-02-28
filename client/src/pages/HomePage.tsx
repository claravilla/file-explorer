import { useState } from "react";
import ActionsBar from "../components/ActionsBar";
import Header from "../components/Header";
import FolderOverview from "../components/FolderOverview";
import ExplorerContainer from "../components/ExplorerContainer";

function HomePage() {
  const [selectedFolder, setSelectedFolder] = useState<string>("root");

  const setFolder = (folderName: string) => {
    setSelectedFolder(folderName);
  };

  return (
    <div>
      <Header title="WELCOME TO THE FOLDER EXPLORER" />
      <ActionsBar parentFolder={selectedFolder} />
      <ExplorerContainer parentFolder={selectedFolder} setFolder={setFolder} />
    </div>
  );
}

export default HomePage;
