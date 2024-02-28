# File Explorer

This is small prototype of a file explorer where you can create new folder and upload file csv or geojson file.
As this app is only available locally, both client and server are in the same repo, under their homonym folder.

## Assumption and limitation

This app assume that only one root folder is present and all subsequential folders are created inside the root folder (or sub-folder).

The left panel can only display 2 levels of subfolder (no files).
The right panel only display one level of subfolder and files.

## Data Model

This app used MongoDB which is a non relational database.
The main challenge is to create a relation between the folders and the files that can easily be used to displat the folder trees in the FE.

### Folder Data Model

- Folder Name
- Parent Folder
- Path: this is used for the breadcrumbs in the folder detailed view
- FolderChildren
- Files: this is used to list all the files saved in the folder

### File Data Model

- Name
- Source

The parent folders is not store at the file level, but upon creating a separate call is made to update the Folder with the file name.

## How to use it

Clone this repo.
Create a .env file for the client with variable:
REACT_APP_SERVER_URL='http://localhost:8080'

Create a .env file for the server with variabl:
MONGODB_URI={your own mongoDB to connect to}  
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