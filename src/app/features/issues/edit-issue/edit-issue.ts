import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IssueService } from '../../../core/services/issue';

@Component({
  selector: 'app-edit-issue',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-issue.html',
  styleUrl: './edit-issue.css',
})
export class EditIssue implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private issueService = inject(IssueService);
  private fb = inject(FormBuilder);

  issue = signal<any>(null);
issueId = '';
  issueForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Medium', Validators.required],
    status: ['Open', Validators.required],
    assignee: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
        this.issueId = id;
      this.issueService.getIssueById(id).subscribe({
        next: (data) => {
          this.issue.set(data);

          this.issueForm.patchValue({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            assignee: data.assignee,
          });
        },
        error: (error) => {
          console.error('Error loading issue:', error);
        },
      });
    }
  }
  onSubmit(): void {
  if (this.issueForm.valid && this.issueId) {
    this.issueService
      .updateIssue(this.issueId, this.issueForm.value)
      .subscribe({
        next: (response) => {
          console.log('Issue updated:', response);
          alert('Issue updated successfully!');
           this.router.navigate(['/issues']);
        },
        error: (error) => {
          console.error('Error updating issue:', error);
        },
      });
  }
}
}