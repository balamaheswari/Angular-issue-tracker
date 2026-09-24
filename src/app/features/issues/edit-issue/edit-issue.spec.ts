import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssue } from './edit-issue';

describe('EditIssue', () => {
  let component: EditIssue;
  let fixture: ComponentFixture<EditIssue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIssue],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIssue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
