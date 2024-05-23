import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatiereService } from '../shared/matiere.service';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  nom: string = '';
  nomProf: string = '';
  selectedImage!: File;
  selectedImageProf!: File;
  loading: boolean = false;
  matieres: any[] = [];
  displayedColumns: string[] = ['nom', 'image', 'nomProf', 'imageProf', 'actions'];

  constructor(
    private matiereService: MatiereService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMatieres();
  }

  onFileSelected(event: any, type: string) {
    if (type === 'image') {
      this.selectedImage = event.target.files[0];
    } else if (type === 'imageProf') {
      this.selectedImageProf = event.target.files[0];
    }
  }

  createMatiere() {
    this.loading = true;
    this.matiereService.createMatiere(this.nom, this.selectedImage, this.nomProf, this.selectedImageProf).subscribe(
      (response: any) => {
        this.getMatieres(); // Refresh the list after creation
        this.loading = false;
        this.snackBar.open('Matière créée avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      (error: any) => {
        console.error('Erreur lors de la création de la matière : ', error);
        this.loading = false;
        this.snackBar.open('Erreur lors de la création de la matière.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  deleteMatiere(id: string) {
    this.matiereService.deleteMatiere(id).subscribe(
      (response: any) => {
        this.getMatieres(); // Refresh the list after deletion
        this.snackBar.open('Matière supprimée avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de la matière : ', error);
        this.snackBar.open('Erreur lors de la suppression de la matière.', 'Fermer', {
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
}
