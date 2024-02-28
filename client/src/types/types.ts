export interface FolderDetailType {
  folderName: string;
  parentFolder: string;
  path: string;
  folderChildren: string[];
  files: string[];
}

export interface FileDetailType {
  name: string;
  folder: string;
  source: Buffer;
}
