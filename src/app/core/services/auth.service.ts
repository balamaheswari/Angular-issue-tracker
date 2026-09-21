import { Injectable, inject,PLATFORM_ID  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/Users';
  private platformId = inject(PLATFORM_ID);

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
logout() {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('token');
  }
}
}