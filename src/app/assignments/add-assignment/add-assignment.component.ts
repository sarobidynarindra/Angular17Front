import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { AuteurService } from '../../shared/auteur.service';
import { MatiereService } from '../../shared/matiere.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-assignment',
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
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;
  auteurs: any[] = [];
  matieres: any[] = [];
  auteurSelectionne!: string;
  matiereSelectionnee!: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private auteurService: AuteurService,
    private matiereService: MatiereService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
    this.getAllAuteurs();
    this.getMatieres();
  }

  getAllAuteurs() {
    this.auteurService.getAllAuteurs().subscribe(
      (response: any) => {
        this.auteurs = response.docs;
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
  onSubmit(event: any) {
    if ((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.auteur = this.auteurSelectionne;
    nouvelAssignment.matiere = this.matiereSelectionnee;

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
