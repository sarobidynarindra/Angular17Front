import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { AuteurService } from '../../shared/auteur.service';
import { MatiereService } from '../../shared/matiere.service';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Ajoutez ceci

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule, // Ajoutez ceci
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    MatStepperModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'], // Correction du nom (styleUrl -> styleUrls)
})
export class AddAssignmentComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  auteurs: any[] = [];
  matieres: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private auteurService: AuteurService,
    private matiereService: MatiereService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomAssignment: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dateDeRendu: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      auteurSelectionne: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      matiereSelectionnee: ['', Validators.required]
    });

    this.getAllAuteurs();
    this.getMatieres();
  }

  getAllAuteurs() {
    this.auteurService.getAllAuteurs().subscribe(
      (response: any) => {
        this.auteurs = response;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des auteurs : ', error);
        this.snackBar.open('Erreur lors de la récupération des auteurs.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  getMatieres() {
    this.matiereService.getAllMatieres().subscribe(
      (response: any) => {
        this.matieres = response.docs;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des matières : ', error);
        this.snackBar.open('Erreur lors de la récupération des matières.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  onSubmit() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid || this.fourthFormGroup.invalid) return;

    const nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.firstFormGroup.get('nomAssignment')?.value;
    nouvelAssignment.dateDeRendu = this.secondFormGroup.get('dateDeRendu')?.value;
    nouvelAssignment.rendu = false;
    nouvelAssignment.auteur = this.thirdFormGroup.get('auteurSelectionne')?.value;
    nouvelAssignment.matiere = this.fourthFormGroup.get('matiereSelectionnee')?.value;

    this.assignmentsService.addAssignment(nouvelAssignment).subscribe(
      (reponse) => {
        console.log(reponse);
        this.snackBar.open('Assignment ajouté avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'assignment : ', error);
        this.snackBar.open('Erreur lors de l\'ajout de l\'assignment.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
