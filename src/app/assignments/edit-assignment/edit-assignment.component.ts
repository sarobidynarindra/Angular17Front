import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    MatStepperModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  assignment?: Assignment;
  editForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      step1: this.formBuilder.group({
        nomAssignment: ['', Validators.required],
        dateDeRendu: ['', Validators.required]
      }),
      step2: this.formBuilder.group({
        note: ['', [Validators.min(0), Validators.max(20)]],
        remarques: ['']
      })
    });

    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      if (assignment) {
        this.editForm.get('step1')?.patchValue({
          nomAssignment: assignment.nom,
          dateDeRendu: assignment.dateDeRendu
        });
        this.editForm.get('step2')?.patchValue({
          note: assignment.note,
          remarques: assignment.remarques
        });
      }
    });
  }

  onSaveAndSubmit(): void {
    if (!this.assignment) return;

    if (!this.editForm.valid) {
      this.snackBar.open('Veuillez remplir toutes les étapes du formulaire.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }

    const formValues = this.editForm.value;
    this.assignment.nom = formValues.step1.nomAssignment;
    this.assignment.dateDeRendu = formValues.step1.dateDeRendu;
    this.assignment.note = formValues.step2.note;
    this.assignment.remarques = formValues.step2.remarques;

    this.assignmentsService.updateAssignment(this.assignment).subscribe({
      next: () => {
        this.snackBar.open('Assignment updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.snackBar.open('Failed to update assignment. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    });
  }

  onNextClick(): void {
    if (this.editForm.get('step1')?.valid) {
      this.stepper.next();
    } else {
      this.snackBar.open('Veuillez remplir correctement cette étape avant de passer à la suivante.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
  }
}