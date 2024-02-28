import { useEffect, useState } from "react";

function BreadCrumbs({
  path,
  setFolder,
}: {
  path: string;
  setFolder: Function;
}) {
  let breadcrumbs: React.ReactNode;

  if (path !== undefined) {
    console.log(path);
    const folders = path.split("/");
    folders.shift();
    const pathElements = folders.map<React.ReactNode>((element) => {
      return (
        <>
          <span
            className="breadcrumbs-element"
            onClick={() => setFolder(element)}
          >
            /{element}
          </span>
        </>
      );
    });
    console.log(pathElements.length);
    breadcrumbs = pathElements.reduce((prev, curr) => [prev, curr]);
  }

  return <article className="breadcrumbs">{breadcrumbs}</article>;
}

export default BreadCrumbs;
