import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  login(): void {
    const formData = {
      email: this.email,
      password: this.password
    };

    console.log('formData: ', formData);

    this.http.post<any>('http://localhost:8010/api/auth/login', formData)
      .subscribe(
        response => {
          console.log('Réponse du serveur : ', response);
          if (response.auth) {
            this.loginSuccessMessage = 'Connexion réussie.';
            this.loginErrorMessage = '';
          } else {
            this.loginSuccessMessage = '';
            this.loginErrorMessage = 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.';
          }
        },
        error => {
          console.error('Erreur lors de la connexion : ', error);
          this.loginSuccessMessage = '';
          this.loginErrorMessage = 'Erreur lors de la connexion.';
        }
      );
  }
}