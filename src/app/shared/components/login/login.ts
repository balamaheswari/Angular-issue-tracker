import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
    ]),
  });

  onSubmit(): void {

    // Clear previous error
    this.loginError.set('');

    // Check form validation
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.authService.login(email, password).subscribe({

      next: (users) => {

        console.log('Login response:', users);

      if (users.length > 0) {
  localStorage.setItem('token', 'mock-jwt-token');

  this.authService.setCurrentUser(users[0]);

 
        this.router.navigate(['/dashboard']);
      }},

      error: (error) => {

        console.error('Login error:', error);

        this.loginError.set(
          'Unable to login. Please try again.'
        );
      },
    });
  }
}