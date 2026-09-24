import { Component,inject  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../../../core/services/issue';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-issue',
  imports: [ReactiveFormsModule],
  templateUrl: './create-issue.html',
  styleUrl: './create-issue.css',
})
export class CreateIssue {
  getFieldError(fieldName: string): string {
  const field = this.issueForm.get(fieldName);

  if (field?.hasError('required') && field.touched) {
    return 'This field is required.';
  }

  return '';
}
  private fb = new FormBuilder();
  private issueService = inject(IssueService);
private router = inject(Router);
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
        this.router.navigate(['/issues']);
      },
      error: (error) => {
        console.error('Error creating issue:', error);
      },
      
    });
  }
}
}