# Note-Maker Application

## Description

The Note-Maker application allows users to upload images of handwritten or printed text, convert the text to Markdown format, and download it as a text file (for my purpose, but if your purpose is to download it as a Markdown file, follow the steps in the **How to Modify for Markdown Files** section). The application also saves the notes to a database for persistence.

## Features

- Upload an image and extract text from it using OCR.
- Convert the extracted text into a Markdown format.
- Download the text as a Markdown file.
- Save the extracted text to mySQL database.
- View a list of saved notes and download them individually.

## How to Use

1. **Upload an Image**: Upload an image containing text.
2. **Extract Text**: The application extracts text from the image using Tesseract.js.
3. **Download as Markdown**: Download the extracted text as a Markdown file.
4. **Save and View Notes**: Save the extracted text to the database and view the list of saved notes.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ananichoumchoum/note-maker.git

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
PORT=8080<orchangeportifyouwish>
DB_HOST=127.0.0.1
DB_NAME=<yourdatabasename>
DB_USER=<yourusername>
DB_PASSWORD=<yourpassword>
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
**To modify the application to use Markdown files directly instead, delete the replace parts and replace this part of the code in the FileList component**:
- In the frontend, update the `handleDownload` function to save the file with a `.md` extension:
    ```javascript
    // Download file
    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title}.md`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    ```

## Future Improvements
1. **UI Enhancements**:

    - Improve the overall look and feel of the application using a modern UI framework like Material-UI or Bootstrap.
    - Add animations and transitions for a smoother user experience.
    - Implement a responsive design to ensure the application works well on mobile devices.

2. **User Authentication**:

    - Add user authentication to allow multiple users to save and manage their own notes.
    - Implement secure login and registration functionality.

3. **Tagging and Categorization**:

    - Allow users to tag and categorize their notes for better organization.
    - Implement search functionality to filter notes by tags or categories.

3. **Delete and Put method**:

    - Add delete and put method to modify data in the database.

4. **Markdown Editor**:

    - Integrate a Markdown editor with live preview functionality.
    - Allow users to create and edit notes directly in the Markdown format.

5. **Export and Import Notes**:

    - Implement functionality to export notes in various formats (PDF, Word, etc.).
    - Allow users to import notes from other formats or applications.
