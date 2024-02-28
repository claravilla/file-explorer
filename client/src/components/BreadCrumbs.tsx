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
    breadcrumbs = pathElements.reduce((prev, curr) => [prev, curr]);
  }

  return <article className="breadcrumbs">{breadcrumbs}</article>;
}

export default BreadCrumbs;
