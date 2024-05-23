import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuteurService } from '../shared/auteur.service';

@Component({
  selector: 'app-auteur',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule
  ],
  templateUrl: './auteur.component.html',
  styleUrl: './auteur.component.css'
})
export class AuteurComponent {
  nom: string = '';
  selectedFile!: File;
  loading: boolean = false; // Variable to track loading state

  constructor(
    private auteurService: AuteurService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createAuteur() {
    this.loading = true; // Set loading to true when form submission starts
    const formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('photo', this.selectedFile);

    this.auteurService.createAuteur(this.nom, this.selectedFile).subscribe(
      (response: any) => {
        console.log('Réponse du serveur : ', response);
        const snackBarRef = this.snackBar.open('Auteur créé avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/auteur']);
          this.loading = false; // Set loading to false when operation is completed
        });
      },
      (error: any) => {
        console.error('Erreur lors de la création de l\'auteur : ', error);
        this.snackBar.open('Erreur lors de la création de l\'auteur.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.loading = false; // Set loading to false in case of error
      }
    );
  }
}
