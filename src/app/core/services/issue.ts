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
   getIssues() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getIssueById(id: string) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}
updateIssue(id: string, issue: any) {
  return this.http.put(`${this.apiUrl}/${id}`, issue);
}
deleteIssue(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}