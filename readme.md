# Note-Maker Application

## Description

The Note-Maker application allows users to upload images of handwritten or printed text, convert the text to Markdown format, and download it as a text file. The application also saves the notes to an SQLite database and a JSON file for persistence.

## Features

- Upload an image and extract text from it using OCR.
- Convert the extracted text into a Markdown format.
- Download the text as a Markdown file.
- Save the extracted text to an SQLite database and a JSON file.
- View a list of saved notes and download them individually.

## How to Use

1. **Upload an Image**: Upload an image containing text.
2. **Extract Text**: The application extracts text from the image using Tesseract.js.
3. **Download as Markdown**: Download the extracted text as a Markdown file.
4. **Save and View Notes**: Save the extracted text to the database and view the list of saved notes.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/note-maker.git

2. **Navigate to the project directory**:
    ```bash
    cd note-maker

3. **Install dependencies for the backend**:
    ```bash
    cd server
    npm install

4. **Install dependencies for the frontend**:
    ```bash
    cd ../client
    npm install

## Environment Setup

**Create a .env file in the server directory with the following contents**:
```bash
PORT=8080
DB_HOST=127.0.0.1
DB_NAME=notetaker
DB_USER=root
DB_PASSWORD=yourpassword
DATA_FILE_PATH=./data/notes.json 
```

## Running the Application
1. **Start the backend server**:
    ```bash
    cd server
    npm run dev

2. **Start the frontend server**:
    ```bash
    cd ../client
    npm start

## Contributing
**Contributions are welcome! Please follow these steps to contribute**:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## How to Modify for Markdown Files
**To modify the application to use Markdown files directly, follow these steps**:

1. Update the file handling logic: Ensure the frontend and backend handle .md files correctly.
2. Update the database schema: Adjust the database to store Markdown-specific data.
3. Update the UI: Ensure the UI can render Markdown files appropriately.