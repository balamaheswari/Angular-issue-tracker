import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/issues';

  createIssue(issue: any) {
    return this.http.post(this.apiUrl, issue);
  }
}