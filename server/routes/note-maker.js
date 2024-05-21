require('dotenv').config();
const express = require('express');
const Tesseract = require('tesseract.js');
const MarkdownIt = require('markdown-it');
const sqlite3 = require('sqlite3')
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config);// Database setup
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
let DATA_FILE_PATH  = path.resolve(process.env.DATA_FILE_PATH);



  // Routes
  router.post('/upload', upload.single('image'), (req, res) => {
    const imagePath = req.file.path; // Get the image from the request body
      Tesseract.recognize(imagePath, 'eng')  // Use Tesseract to recognize text in english
        .then(({ data: { text } }) => {
          const md = new MarkdownIt(); 
          const formattedText = md.render(text); // Format the text using Markdown-It
          res.json({ text: formattedText });// Return the formatted text
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to process image' });
        });
    });
    
    // Route to save the extracted text with title
    router.post('/save', async (req, res) => {
        const { title, content } = req.body; // Get the title and content from the request body
          
            // Save database and files
            try {
                await db('notes').insert({ title, content });
                res.status(201).send('Note saved successfully');
              } catch (err) {
                res.status(500).send(`Failed to save note: ${err}`);
              }
          });
    
    router.get('/', async (req, res) => {
    try {
        const notes = await db('notes').select('*');
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).send(`Failed to retrieve notes: ${err}`);
    }
    });
    
module.exports = router;