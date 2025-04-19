const PDFDocument = require('pdfkit');
const path = require('path');
const Student = require('../models/studentModel');
const fs = require('fs');

exports.generateStudentPDF = (req, res) => {
  const studentId = req.params.id;

  Student.getById(studentId)
    .then(student => {
      const doc = new PDFDocument();
      const filePath = `./pdfs/student_${studentId}.pdf`;

      // Pipe to file
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      doc.fontSize(25).text('Student Report', { align: 'center' });
      doc.fontSize(16).text(`Name: ${student.name}`);
      doc.text(`Roll: ${student.roll}`);
      doc.text(`Department: ${student.department}`);
      doc.text(`Year: ${student.year}`);
      doc.text(`Subjects: ${student.subjects.join(', ')}`);
      doc.text(`Grades: ${JSON.stringify(student.grades)}`);
      doc.text(`Attendance: ${student.attendance}%`);
      doc.end();

      // When done writing, stream the PDF to the response
      writeStream.on('finish', () => {
        res.sendFile(path.resolve(filePath)); // <-- stream PDF
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error generating PDF');
    });
};
