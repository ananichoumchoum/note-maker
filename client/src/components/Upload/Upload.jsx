import React, { useState, useRef  } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Upload.scss';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    fileInputRef.current.value = ''; 
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image to upload');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', selectedImage);
     // Debugging: log FormData content
     for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    try {
      const response = await axios.post('http://localhost:8080/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setExtractedText(response.data.text);
      setLoading(false);
    } catch (error) {
      console.error('Failed to upload image and extract text', error);
      setError('Failed to upload image and extract text');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !extractedText) {
      setError('Please provide a title and upload an image');
      return;
    }
    try {
      await axios.post('http://localhost:8080/notes/save', {
        title,
        content: extractedText
      });
      setTitle('');
      setSelectedImage(null);
      setPreview(null);
      setExtractedText('');
      fileInputRef.current.value = ''; 
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };
  return (
    <div className="upload">
      <h1 className="upload__title">Upload the image you want to format into a list</h1>
      <form className="upload__form" method="post" onSubmit={(e) => e.preventDefault()}>
        <label className="upload__title-label" htmlFor="title" >Title</label>
        <input 
          className="upload__title-input" 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Enter the title you want for this list" 
          value={title}
          onChange={handleTitleChange}
        />

        {!selectedImage && (
          <label className="upload__upload-label" htmlFor="image">Upload Image</label>
        )}
        <input className="upload__upload-input" type="file" name="image" id="image" ref={fileInputRef} onChange={handleImageChange} />
        
        {preview && (
          <div className="upload__image-preview">
            <img className="upload__image" src={preview} alt="Selected" />
            <button className="upload__button-image"  type="button" onClick={handleRemoveImage}>X</button>
          </div>
        )}

        <button className="upload__button-upload" type="submit" onClick={handleUpload}>Upload</button>
        <div className="upload__image-text-translator">
          <h2 className="upload__translator-title">Image Text Translator</h2>
          {loading && <p>Loading... Please wait while we process the image.</p>}
          {error && <p className="upload__error">{error}</p>}
          {!loading && !error && extractedText && (
            <ReactMarkdown>{extractedText}</ReactMarkdown>
          )}
          <button className="upload__button-upload" type="button" onClick={handleSave}>Submit</button>
        </div>
        
      </form>
    </div>
  );
};

export default Upload;