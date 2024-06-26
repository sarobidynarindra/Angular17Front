import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assignment-dialog',
  templateUrl: './assignment-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./assignment-dialog.component.css']
})
export class AssignmentDialogComponent {
  form: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      note: [''],
      remarques: [''],
    });
  }

  onSubmit() {
    // Combine the existing assignment data with the form data
    const updatedAssignment = {
      ...this.data.assignment,
      note: this.form.value.note,
      remarques: this.form.value.remarques
    };
    this.dialogRef.close(updatedAssignment); // Close the dialog with the updated assignment data
  }
  
  onCancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
