import FolderDetails from "./FolderDetails";
import FolderOverview from "./FolderOverview";
import Pipe from "./Pipe";

function ExplorerContainer({
  parentFolder,
  setFolder,
}: {
  parentFolder: string;
  setFolder: Function;
}) {
  return (
    <section className="explorer-container">
      <FolderOverview setFolder={setFolder} />
      <Pipe className="pipe-folder-explorer" />
      <FolderDetails folderName={parentFolder} setFolder={setFolder} />
    </section>
  );
}

export default ExplorerContainer;
