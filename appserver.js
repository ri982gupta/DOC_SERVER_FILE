const express = require('express');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Use CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to convert .doc file to .docx
app.post('/convert', upload.single('file'), async (req, res) => {
  const { file } = req;
  const docPath = file.path;
  const docxPath = path.join(__dirname, 'public', `${file.filename}.docx`);

  try {
    // Convert .doc to .docx
    const buffer = fs.readFileSync(docPath);
    const result = await mammoth.convertToHtml({ buffer });
    fs.writeFileSync(docxPath, result.value);

    res.status(200).send({ message: 'File converted successfully', filename: `${file.filename}.docx` });
  } catch (error) {
    console.error('Error converting document:', error);
    res.status(500).send({ error: 'Failed to convert document' });
  }
});

// Endpoint to download .doc file
app.post('/download', upload.single('file'), (req, res) => {
  const { file } = req;
  const filePath = path.join(__dirname, 'public', 'Document.doc');

  try {
    fs.writeFileSync(filePath, fs.readFileSync(file.path));
    res.status(200).send({ message: 'File saved successfully' });
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).send({ error: 'Failed to save document' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
