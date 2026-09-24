import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IssueService } from '../../core/services/issue';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private issueService = inject(IssueService);
  private platformId = inject(PLATFORM_ID);

  totalIssues = signal(0);
  openIssues = signal(0);
  inProgressIssues = signal(0);
  resolvedIssues = signal(0);
  recentIssues = signal<any[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.issueService.getIssues().subscribe({
        next: (issues) => {
          this.totalIssues.set(issues.length);

          this.openIssues.set(
            issues.filter(issue => issue.status === 'Open').length
          );

          this.inProgressIssues.set(
            issues.filter(issue => issue.status === 'In Progress').length
          );

          this.resolvedIssues.set(
            issues.filter(issue => issue.status === 'Resolved').length
          );

          this.recentIssues.set(
            issues.slice(-5).reverse()
          );
        },

        error: (error) => {
          console.error('Error fetching dashboard issues:', error);
        },
      });
    }
  }
}