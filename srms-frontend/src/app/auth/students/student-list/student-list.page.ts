import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  standalone:false,
})
export class StudentListPage implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedYear: number | '' = '';

  departments: string[] = ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL'];
  years: number[] = [1, 2, 3, 4];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data;
    });
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchDept = this.selectedDepartment ? s.department === this.selectedDepartment : true;
      const matchYear = this.selectedYear ? s.year === +this.selectedYear : true;

      return matchSearch && matchDept && matchYear;
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/students/student-form'], { queryParams: { id } });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.fetchStudents();
        alert('Deleted successfully');
      });
    }
  }

  downloadPDF(studentId: number) {
    const url = `http://localhost:5000/api/pdf/${studentId}`;
    window.open(url, '_blank');
  }
  
}
