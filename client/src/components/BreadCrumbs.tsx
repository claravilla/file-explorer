import { Fragment } from "react";

function BreadCrumbs({
  path,
  setFolder,
}: {
  path: string;
  setFolder: Function;
}) {
  let breadcrumbs: React.ReactNode;

  if (path !== undefined) {
    const folders = path.split("/");
    folders.shift();
    const pathElements = folders.map<React.ReactNode>((element) => {
      return (
        <Fragment key={element}>
          <span
            className="breadcrumbs-element"
            onClick={() => setFolder(element)}
          >
            /{element}
          </span>
        </Fragment>
      );
    });
    breadcrumbs = pathElements.reduce((prev, curr) => [prev, curr]);
  }

  return <article className="breadcrumbs">{breadcrumbs}</article>;
}

export default BreadCrumbs;
