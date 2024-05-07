import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginSuccessMessage: string = '';
  loginErrorMessage: string = '';

  constructor(private authService: AuthService,private snackBar: MatSnackBar,private router: Router) { }

  login(): void {
    const formData = {
      email: this.email,
      password: this.password
    };

    console.log('formData: ', formData);
    this.authService.login(formData).subscribe(
      (response: any) => {
        console.log('Réponse du serveur : ', response);
        if (response) {
          const snackBarRef = this.snackBar.open('Connexion réussie.', 'Fermer', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'end'
          });
  
          this.router.navigate(['/home']); 
          this.loginErrorMessage = '';
        } else {
          this.loginSuccessMessage = '';
          this.loginErrorMessage = 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.';
        }
      },
      (error: any) => {
        console.error('Erreur lors de la connexion : ', error);
        this.loginSuccessMessage = '';
        this.loginErrorMessage = 'Erreur lors de la connexion.';
      }
    );

  }
  isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }
}
