const Student = require('../models/studentModel');
const verifyToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// ADD Student
exports.addStudent = (req, res) => {
  const { name, roll, department, year, subjects, grades, attendance } = req.body;
  if (!name || !roll) return res.status(400).json({ message: 'Missing required fields.' });

  Student.create(name, roll, department, year, subjects, grades, attendance)
    .then(studentId => {
      return res.status(201).json({ message: 'Student added successfully!', studentId });
    })
    .catch(err => {
      console.error(err);  // log the error
      return res.status(500).json({ message: 'Error inserting student. Please try again later.' });
    });
};

// GET ALL Students
exports.getAllStudents = (req, res) => {
  const userRole = req.role;
  if (!userRole || (userRole !== 'admin' && userRole !== 'faculty')) {
    return res.status(403).json({ message: 'Forbidden: You don’t have access to view this data.' });
  }

  Student.getAll()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      console.error(err);  // log the error
      res.status(500).json({ message: 'Failed to fetch students. Please try again later.' });
    });
};

// GET ONE Student
exports.getStudentById = (req, res) => {
  const id = req.params.id;
  const userRole = req.role;
  if (!userRole || (userRole !== 'admin' && userRole !== 'faculty')) {
    return res.status(403).json({ message: 'Forbidden: You don’t have access to view this data.' });
  }

  Student.getById(id)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      console.error(err);  // log the error
      res.status(404).json({ message: 'Student not found. Please check the ID.' });
    });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;
  const userRole = req.role;

  if (!userRole) return res.status(403).json({ message: 'User role not found. Access denied.' });

  let updateData = {};

  if (userRole === 'admin') {
    // Admin can update everything, but only if the fields are provided in the request body
    const { name, roll, department, year, subjects, grades, attendance } = req.body;

    // Dynamically check which fields are provided in the body and update only those
    if (name) updateData.name = name;
    if (roll) updateData.roll = roll;
    if (department) updateData.department = department;
    if (year) updateData.year = year;
    if (subjects) updateData.subjects = subjects;
    if (grades) updateData.grades = grades;
    if (attendance) updateData.attendance = attendance;

  } else if (userRole === 'faculty') {
    // Faculty can only update academic fields (subjects, grades, attendance)
    const { subjects, grades, attendance } = req.body;

    if (subjects) updateData.subjects = subjects;
    if (grades) updateData.grades = grades;
    if (attendance) updateData.attendance = attendance;

  } else {
    return res.status(403).json({ message: 'Forbidden: Insufficient role to update student.' });
  }

  // Ensure subjects and grades are stringified if they are arrays or objects


  // Proceed with updating the student record in the database
  Student.update(id, updateData)
  .then(updatedStudent => {
 
    res.status(200).json({ message: 'Student updated successfully!', student: updatedStudent });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Error updating student. Please try again later.' });
  });
};


// DELETE Student
exports.deleteStudent = (req, res) => {
  const id = req.params.id;
  const userRole = req.role;
  if (!userRole || userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only admins can delete students.' });
  }

  Student.delete(id)
    .then(message => {
      res.status(200).json({ message });
    })
    .catch(err => {
      console.error(err);  // log the error
      res.status(500).json({ message: 'Error deleting student. Please try again later.' });
    });
};
