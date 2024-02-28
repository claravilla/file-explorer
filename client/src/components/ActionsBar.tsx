import Pipe from "./Pipe";
import UploadFileForm from "./UploadFileForm";
import CreateFolderForm from "./CreateFolderForm";

function ActionsBar({ parentFolder }: { parentFolder: string }) {
  return (
    <section className="actions-bar">
      <UploadFileForm parentFolder={parentFolder} />
      <Pipe className="pipe-actions-bar" />
      <CreateFolderForm parentFolder={parentFolder} />
    </section>
  );
}

export default ActionsBar;
