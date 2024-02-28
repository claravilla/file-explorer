function ListElement({
  name,
  icon,
  setFolder,
}: {
  name: string;
  icon: string;
  setFolder: Function;
}) {
  return (
    <li key={name} onClick={() => setFolder(name)}>
      <span className="tree-line"></span>
      {icon}
      {name}
    </li>
  );
}

export default ListElement;
