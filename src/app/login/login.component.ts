import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        expiresInMins: 30
      };

      this.http.post<any>('https://dummyjson.com/auth/login', loginData)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.accessToken) {
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('user', JSON.stringify(res));
              this.userService.fetchUserProfile(res.accessToken);

              // Show success message
              Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome, ${res.username}!`,
                timer: 2000,
                showConfirmButton: false
              });

              this.router.navigate(['/intro']);
            } else {
              this.showErrorMessage('Login failed. Please try again.');
            }
          },
          error: (err) => {
            console.error(err);
            this.showErrorMessage('Login failed. Please try again.');
          }
        });
    }
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;

    // Show error message with Swal
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: message
    });
  }
}
