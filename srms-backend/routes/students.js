const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const studentController = require('../controllers/studentController');

// Add student - only admins or faculty can add a student
router.post('/add', verifyToken, allowRoles('admin', 'faculty'), studentController.addStudent);

// Get all students - only admins or faculty can view
router.get('/', verifyToken, allowRoles('admin', 'faculty'), studentController.getAllStudents);

// Get student by ID - only admins or faculty can view
router.get('/:id', verifyToken, allowRoles('admin', 'faculty'), studentController.getStudentById);

// Update student - admins can update everything, faculty can update academic fields
router.put('/:id', verifyToken, allowRoles('admin', 'faculty'), studentController.updateStudent);

// Delete student - only admin can delete
router.delete('/:id', verifyToken, allowRoles('admin'), studentController.deleteStudent);

module.exports = router;
