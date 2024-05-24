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
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  auteurs: any[] = []; // Ajout de la liste des auteurs
  matieres: any[] = []; // Ajout de la liste des matières

  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  selectedAuteurId?: string; // Ajout de l'id de l'auteur sélectionné
  selectedMatiereId?: string; // Ajout de l'id de la matière sélectionnée

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private auteurService: AuteurService,
    private matiereService: MatiereService,
  ) { }

  ngOnInit() {
    // on récupère l'id dans l'url
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;
        // on met à jour les champs du formulaire
        if (assignment !== undefined) {
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = assignment.dateDeRendu;
          
        }
      });

  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined || !this.selectedAuteurId || !this.selectedMatiereId) return;

    // on récupère les valeurs dans le formulaire
    this.assignment._id = this.route.snapshot.params['id'];
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.selectedAuteurId; // Assigner l'id de l'auteur sélectionné
    this.assignment.matiere = this.selectedMatiereId; // Assigner l'id de la matière sélectionnée

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
