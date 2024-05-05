import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}
  uri='http://localhost:8010/api/auth/login';
  urldeconnexion='http://localhost:8010/api/auth/logout';

  login(formData: any): Observable<boolean> {
  return this.http.post<any>(this.uri, formData).pipe(
    map((response : any)=> {
      this.isAuthenticated = response.auth;
      return this.isAuthenticated;
    }),
    
  );
}
isLoggedIn(): Observable<boolean> {
    return of(this.isAuthenticated);
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.urldeconnexion);
  }
  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  
}
