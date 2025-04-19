import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  name: string;
  roll: string;
  department: string;
  year: number;
  subjects: string[]; // Array of subject names
  grades: { [key: string]: string }; // e.g., { Math: 'A', Physics: 'B' }
  attendance: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }


  addStudent(student: Student): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, student);
  }

  updateStudent(id: number, student: Student): Observable<{ message: string, student: Student }> {
    return this.http.put<{ message: string, student: Student }>(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
