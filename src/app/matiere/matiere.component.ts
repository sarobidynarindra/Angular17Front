import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatiereService } from '../shared/matiere.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule
  ],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  nom: string = '';
  nomProf: string = '';
  selectedFile!: File;
  selectedFileProf!: File;
  loading: boolean = false; // Variable to track loading state

  constructor(
    private matiereService: MatiereService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onFileSelected(event: any, fileType: string) {
    if (fileType === 'image') {
      this.selectedFile = event.target.files[0];
    } else if (fileType === 'imageProf') {
      this.selectedFileProf = event.target.files[0];
    }
  }

  createMatiere() {
    this.loading = true;
    this.matiereService.createMatiere(this.nom, this.selectedFile, this.nomProf, this.selectedFileProf).subscribe(
      (response: any) => {
        console.log('Réponse du serveur : ', response);
        const snackBarRef = this.snackBar.open('Matière ajoutée avec succès.', 'Fermer', {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/matiere']);
          this.loading = false;
        });
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de la matière : ', error);
        this.snackBar.open('Erreur lors de l\'ajout de la matière.', 'Fermer', {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.loading = false;
      }
    );
  }
}