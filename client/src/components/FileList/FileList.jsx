import './FileList.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const FileList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://localhost:8080/notes');
          setNotes(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to retrieve notes');
          setLoading(false);
        }
      };
  
      fetchNotes();
    }, []);
    
    const handleDownload = (note) => {
        let content = note.content;
        // Replace HTML tags with Markdown-like format and remove unwanted tags
        content = content.replace(/<li>/g, ' ')
        .replace(/<\/li>/g, '\n')
        .replace(/<\/?ul>/g, '')
        .replace(/<\/?ol>/g, '')
        .replace(/<\/?p>/g, '')
        .replace(/<\/?b>/g, '')
        .replace(/<\/?i>/g, '')
        .replace(/<\/?u>/g, '')
        .replace(/<\/?h\d>/g, '')
        .replace(/<\/?blockquote>/g, '')
        .replace(/<\/?pre>/g, '')
        .replace(/<\/?code>/g, '')
        .replace(/<\/?em>/g, '')
        .replace(/<\/?strong>/g, '')
        .replace(/<\/?hr>/g, '');

    // Replace special HTML entities
    content = content.replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&copy;/g, '©')
        .replace(/&reg;/g, '®');
        const fileContent = ` ${note.title}\n\n${content}`;
    
         // Download file
        const element = document.createElement('a');
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${note.title}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      };
return (
    <div className="file-list">
      <h1 className="file-list__title">Notes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="file-list__error">{error}</p>}
      <ul className="file-list__list">
        {notes.map(note => (
          <li key={note.id} className="file-list__item">
          {note.title}
          <button className="file-list__button" onClick={() => handleDownload(note)}>Download</button>
        </li>
        ))}
      </ul>
    </div>
  );
};
export default FileList;