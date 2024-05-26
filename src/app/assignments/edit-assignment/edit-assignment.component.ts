import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatiereService } from '../../shared/matiere.service';
import { AuteurService } from '../../shared/auteur.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  auteurs: any[] = [];
  matieres: any[] = [];

  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  selectedAuteurId?: string;
  selectedMatiereId?: string;
  note!: number;
  remarques = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private auteurService: AuteurService,
    private matiereService: MatiereService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      if (assignment !== undefined) {
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.note = assignment.note;
        this.remarques = assignment.remarques;
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment === '' || this.dateDeRendu === undefined) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignment.remarques = this.remarques;
    console.log(this.assignment.note);
    console.log(this.assignment.remarques);
    this.assignmentsService.updateAssignment(this.assignment).subscribe({
      next: (message) => {
        this.snackBar.open('Assignment updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.snackBar.open('Failed to update assignment. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    });
  }
}
