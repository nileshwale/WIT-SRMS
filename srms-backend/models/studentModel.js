const db = require('../db/database');

// Model for Student
const Student = {
  // CREATE Student
  create: (name, roll, department, year, subjects, grades, attendance) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO students (name, roll, department, year, subjects, grades, attendance)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.run(sql, [name, roll, department, year, JSON.stringify(subjects), JSON.stringify(grades), attendance], function(err) {
        if (err) return reject(err);
        resolve(this.lastID);  // Return the ID of the newly created student
      });
    });
  },

  // GET ALL Students
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM students', (err, rows) => {
        if (err) return reject(err);
        // Parse subjects and grades before returning
        resolve(rows.map(student => ({
          ...student,
          subjects: JSON.parse(student.subjects || '[]'),
          grades: JSON.parse(student.grades || '{}')
        })));
      });
    });
  },

  // GET Student by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM students WHERE id = ?', [id], (err, student) => {
        if (err || !student) return reject('Student not found');
        // Parse subjects and grades before returning
        resolve({
          ...student,
          subjects: JSON.parse(student.subjects || '[]'),
          grades: JSON.parse(student.grades || '{}')
        });
      });
    });
  },

  // UPDATE Student
  update: (id, updateData) => {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(updateData)
        .map(key => `${key} = ?`)
        .join(', ');
  
      const values = Object.keys(updateData).map(key => {
        if (key === 'subjects' || key === 'grades') {
          return JSON.stringify(updateData[key]); // ✅ Save as JSON
        }
        return updateData[key];
      });
  
      const sql = `UPDATE students SET ${fields} WHERE id = ?`;
  
      db.run(sql, [...values, id], function(err) {
        if (err) return reject(err);
  
        // ✅ After update, fetch and return the updated student
        db.get('SELECT * FROM students WHERE id = ?', [id], (err2, student) => {
          if (err2 || !student) return reject('Student updated but failed to retrieve updated record');
  
          // Parse the fields back to real objects
          resolve({
            ...student,
            subjects: JSON.parse(student.subjects || '[]'),
            grades: JSON.parse(student.grades || '{}')
          });
        });
      });
    });
  }
,  

  // DELETE Student
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) return reject(err);
        resolve('Student deleted successfully!');
      });
    });
  }
};

module.exports = Student;
