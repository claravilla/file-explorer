# File Explorer

This is small prototype of a file explorer where you can create new folders and upload csv or geojson file.
As this app is only available locally, both client and server are in the same repo, under their homonym folder.

## Assumptions and limitations

This app assumes that only one root folder is present and all subsequential folders are created inside the root folder (or its sub-folders).

The left panel only displays 2 levels of subfolders (no files).
The right panel only displays one level of subfolder and files.

## Data Model

This app used MongoDB which is a non relational database.
The main challenge is to create a relation between folders and files that can easily be used to display the folder trees in the FE. This has been achieved by adding fields that contain parent and children details.

### Folder Data Model

- Folder Name: unique key
- Parent Folder
- Path
- FolderChildren
- Files

The path field is used for the breadcrumbs in the folder detailed view.  
The files field contains all files that belong to the folder and it's used for the detailed view.

### File Data Model

- Name: unique key
- Source

The parent folders is not stored at the file level, but upon uploading a file a separate call is made to add the file name the Files field of the Folder.

## How to use it

Clone this repo.

Create a .env file for the client with variable:
REACT_APP_SERVER_URL='http://localhost:8080'

Create a .env file for the server with variable:
MONGODB_URI={your own mongoDB to connect to}

Install dependencies

`cd server` and run `npm install`  
`cd client` and run `npm install`

**To start the server:**  
`cd server`  
`npm start`  
**To start the client:**  
`cd client`  
`npm start`

### Next steps

**Bug fixes**

- Fix the unique key warning in the console
- Fix the re-rendering when a new folder is created or a file uploaded

**Features**

- Add a visual component to preview the file content
- Add more test

### Build with

- React
- Node js - Express
- Mongo db
