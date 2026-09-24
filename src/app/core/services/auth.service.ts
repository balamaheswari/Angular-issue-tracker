import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = 'http://localhost:3000/Users';

  login(email: string, password: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }

    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }

  setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');

      return user ? JSON.parse(user) : null;
    }

    return null;
  }
}