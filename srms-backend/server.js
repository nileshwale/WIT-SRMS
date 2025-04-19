const express = require('express');
const app = require('./app');
const path = require('path');
const PORT = process.env.PORT || 5000;
const pdfRoutes = require('./routes/pdf'); // ✅ path to the file above
app.use('/', pdfRoutes);



// ✅ Serve PDFs from the pdfs folder
app.use('/pdfs', express.static('pdfs'));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
