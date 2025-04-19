const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Route to generate student PDF
router.get('/api/pdf/:id', pdfController.generateStudentPDF);

module.exports = router;
