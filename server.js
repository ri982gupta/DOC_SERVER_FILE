// const express = require('express');
// const multer = require('multer');
// const libre = require('libreoffice-convert');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 5000;

// // Multer setup for file upload
// const upload = multer({ dest: 'uploads/' });

// app.post('/convert-to-doc', upload.single('file'), (req, res) => {
//   const file = req.file;
//   const ext = '.doc';
//   const outputPath = path.join(__dirname, 'output', `${path.parse(file.originalname).name}${ext}`);

//   fs.readFile(file.path, (err, data) => {
//     if (err) {
//       return res.status(500).send('Error reading file');
//     }

//     libre.convert(data, ext, undefined, (err, done) => {
//       if (err) {
//         return res.status(500).send('Error converting file');
//       }

//       fs.writeFileSync(outputPath, done);
//       res.download(outputPath, 'Sample.doc', err => {
//         if (err) {
//           console.error('Error sending file:', err);
//         }
//         // Cleanup files
//         fs.unlinkSync(file.path);
//         fs.unlinkSync(outputPath);
//       });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// save as .doc is possible 

//------------------------------------------------------------------------------------------------------------------------------------


// const express = require('express');
// const multer = require('multer');
// const libre = require('libreoffice-convert');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 5000;

// // Multer setup for file upload
// const upload = multer({ dest: 'uploads/' });

// // Endpoint to convert .doc to .sfdt
// app.post('/convert-to-sfdt', upload.none(), (req, res) => {
//   const { documentUrl } = req.body;

//   libre.convert(fs.readFileSync(path.join(__dirname, '..', 'public', 'Document.doc')), '.sfdt', undefined, (err, done) => {
//     if (err) {
//       console.error('Error converting .doc to .sfdt:', err);
//       res.status(500).send('Error converting document');
//       return;
//     }

//     const convertedBlob = Buffer.from(done);
//     res.set({
//       'Content-Type': 'application/octet-stream',
//       'Content-Disposition': 'attachment; filename=Document.sfdt'
//     });
//     res.send(convertedBlob);
//   });
// });

// // Endpoint to convert .docx back to .doc
// app.post('/convert-to-doc', upload.single('file'), (req, res) => {
//   const file = req.file;
//   const outputPath = path.join(__dirname, 'output', `${path.parse(file.originalname).name}.doc`);

//   libre.convert(fs.readFileSync(file.path), '.doc', undefined, (err, done) => {
//     if (err) {
//       console.error('Error converting .docx to .doc:', err);
//       res.status(500).send('Error converting document');
//       return;
//     }

//     fs.writeFileSync(outputPath, done);
//     res.download(outputPath, 'Document.doc', err => {
//       if (err) {
//         console.error('Error sending file:', err);
//       }
//       // Cleanup files
//       fs.unlinkSync(file.path);
//       fs.unlinkSync(outputPath);
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//NOT ABLE TO LOAD THE DOCUMENT


//------------------------------------------------------------WORKING------------------------------------------------------------



const express = require('express');
const multer = require('multer');
const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/convert-to-doc', upload.single('file'), (req, res) => {
  const file = req.file;
  const ext = '.doc';
  const outputPath = path.join(__dirname, 'output', `${path.parse(file.originalname).name}${ext}`);

  fs.readFile(file.path, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    libre.convert(data, ext, undefined, (err, done) => {
      if (err) {
        return res.status(500).send('Error converting file');
      }

      fs.writeFileSync(outputPath, done);
      res.download(outputPath, 'Sample.doc', err => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Cleanup files
        fs.unlinkSync(file.path);
        fs.unlinkSync(outputPath);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// SAVE AS .DOC , LOADING IS NOT WORKING
