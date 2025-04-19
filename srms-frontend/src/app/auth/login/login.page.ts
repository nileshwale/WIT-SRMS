import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],  
  standalone:false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe((res: any) => {
      this.auth.saveToken(res.token);
      this.router.navigate(['/dashboard']);
    }, err => {
      alert('Invalid credentials');
    });
  }
}
