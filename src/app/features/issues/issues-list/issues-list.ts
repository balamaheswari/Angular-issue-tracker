import { Component, inject, OnInit,PLATFORM_ID ,signal  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IssueService } from '../../../core/services/issue';

@Component({
  selector: 'app-issues-list',
  imports: [RouterLink],
  templateUrl: './issues-list.html',
  styleUrl: './issues-list.css',
})
export class IssuesList implements OnInit {
  private issueService = inject(IssueService);
  private platformId = inject(PLATFORM_ID);

  issues = signal<any[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.issueService.getIssues().subscribe({
      next: (data) => {
     this.issues.set(data);
        console.log('Issues:', this.issues);
      },
      error: (error) => {
        console.error('Error fetching issues:', error);
      },
    });
  }
}
 deleteIssue(id: string): void {
    const confirmed = confirm(
      'Are you sure you want to delete this issue?'
    );

    if (!confirmed) {
      return;
    }

    this.issueService.deleteIssue(id).subscribe({
      next: () => {
        this.issues.update((issues) =>
          issues.filter((issue) => issue.id !== id)
        );

        alert('Issue deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting issue:', error);
      },
    });
  }

}