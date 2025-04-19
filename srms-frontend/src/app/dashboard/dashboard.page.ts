import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../auth/students/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: false,
})
export class DashboardPage implements OnInit {
  
  statCards: any[] = [];
  // Dashboard stats
  totalStudents = 0;
  departmentStats: { name: string, count: number }[] = [];
  yearStats: { year: number, count: number }[] = [];
  averageAttendance = 0;

  // Student list
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedYear: number | '' = '';

  departments: string[] = ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL'];
  years: number[] = [1, 2, 3, 4];



  constructor(private studentService: StudentService, private router: Router, private authService: AuthService, private toastCtrl: ToastController
) {}

  ngOnInit() {
    this.loadData();
  }

  async logout() {
    this.authService.logout(); // Clear token
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out.',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
    this.router.navigate(['/auth/login']); // Navigate to login
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedDepartment = '';
    this.selectedYear = '';
    this.filterStudents(); // or reload the original student list
  }
  

  loadData() {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      // Dashboard stats
      this.totalStudents = students.length;

      const deptMap: any = {};
      const yearMap: any = {};
      let attendanceTotal = 0;

      students.forEach(student => {
        deptMap[student.department] = (deptMap[student.department] || 0) + 1;
        yearMap[student.year] = (yearMap[student.year] || 0) + 1;
        attendanceTotal += student.attendance;
      });

      this.departmentStats = Object.keys(deptMap).map(name => ({ name, count: deptMap[name] }));
      this.yearStats = Object.keys(yearMap).map(year => ({ year: +year, count: yearMap[year] }));
      this.averageAttendance = students.length ? attendanceTotal / students.length : 0;

      // Student list
      this.students = students;
      this.filteredStudents = students;
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
        this.loadData();
        alert('Deleted successfully');
      });
    }
  }

  downloadPDF(studentId: number) {
    const url = `http://localhost:5000/api/pdf/${studentId}`;
    window.open(url, '_blank');
  }
  
}