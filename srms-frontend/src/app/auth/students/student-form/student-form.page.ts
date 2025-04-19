import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.page.html',
  standalone:false,
})
export class StudentFormPage implements OnInit {
  student: Student = {
    id: 0,
    name: '',
    roll: '',
    department: '',
    year: 1,
    subjects: [],
    grades: {},
    attendance: 100
  };

  isEdit: boolean = false;
  studentId: number = 0;

  subjects: string[] = [];
  grades: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.studentId = +params['id'];
        this.loadStudent();
      } else {
        this.subjects = [];
        this.grades = [];
      }
    });
  }
  

  loadStudent() {
    this.studentService.getStudent(this.studentId).subscribe((data: Student) => {
      this.student = data;
  
      // Initialize subjects
      this.subjects = Array.isArray(data.subjects) ? [...data.subjects] : [];
  
      // Reconstruct grades array in same order as subjects
      this.grades = this.subjects.map(subject => {
        return data.grades?.[subject] || '';
      });
    });
  }
  
    

  addSubject() {  
  
    if (this.subjects.length >= 5) {
      alert('You can add a maximum of 5 subjects.');
      return;
    }
  
    this.subjects.push('');
    this.grades.push('');
  }
  

  removeSubject(index: number) {
    this.subjects.splice(index, 1);
    this.grades.splice(index, 1);
  }

  buildGradesObject(): { [key: string]: string } {
    const gradeObj: { [key: string]: string } = {};
  
    const safeSubjects = Array.isArray(this.subjects) ? this.subjects : [];
  
    safeSubjects.forEach((subj, i) => {
      if (subj?.trim()) {
        gradeObj[subj] = this.grades[i] || '';
      }
    });
  
    return gradeObj;
  }
  

  submitForm() {
    console.log('📦 subjects before submit:', this.subjects);
    console.log('📦 grades before submit:', this.grades);
    console.log('📦 gradesObject before submit:', this.buildGradesObject());  
    this.student.subjects = this.subjects;
    this.student.grades = this.buildGradesObject();
    if (this.isEdit) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe(response => {
        console.log('✅ Updated Student:', response.student);
        alert('Student updated successfully!');
        this.router.navigate(['/students/student-list']);
      });
  
    } else {
      this.studentService.addStudent(this.student).subscribe(() => {
        alert('Student added successfully!');
        this.router.navigate(['/students/student-list']);
      });
    }
  }
}
