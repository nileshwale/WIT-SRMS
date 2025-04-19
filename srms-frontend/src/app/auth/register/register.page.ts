import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage {
  email = '';
  password = '';
  role = 'admin';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password, role: this.role }).subscribe(() => {
      alert('Registration successful!');
      this.router.navigate(['/auth/login']);
    }, err => {
      alert('Registration failed');
    });
  }
}
