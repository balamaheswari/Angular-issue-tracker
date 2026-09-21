import { Component,inject  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../../../core/services/issue';
@Component({
  selector: 'app-create-issue',
  imports: [ReactiveFormsModule],
  templateUrl: './create-issue.html',
  styleUrl: './create-issue.css',
})
export class CreateIssue {
  private fb = new FormBuilder();
  private issueService = inject(IssueService);

  issueForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Medium', Validators.required],
    assignee: ['', Validators.required],
  });

 onSubmit() {
  if (this.issueForm.valid) {
    const issue = {
      ...this.issueForm.value,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    this.issueService.createIssue(issue).subscribe({
      next: (response) => {
        console.log('Issue created successfully:', response);
        alert('Issue created successfully!');
      },
      error: (error) => {
        console.error('Error creating issue:', error);
      },
    });
  }
}
}