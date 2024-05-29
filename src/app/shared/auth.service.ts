import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = !!localStorage.getItem('isAuthenticated');

  constructor(private http: HttpClient) { }

  uri = 'https://angular17back.onrender.com/api/auth/login';
  urldeconnexion = 'https://angular17back.onrender.com/api/auth/logout';

  login(formData: any): Observable<boolean> {
    return this.http.post<any>(this.uri, formData).pipe(
      map((response: any) => {
        this.isAuthenticated = response.auth;
        localStorage.setItem('isAuthenticated', this.isAuthenticated ? 'true' : 'false');
        console.log(localStorage);
        return this.isAuthenticated;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isAuthenticated);
  }

  logout(): Observable<any> {
    localStorage.removeItem('isAuthenticated');
    console.log('Valeur actuelle de isAuthenticated dans localStorage après déconnexion :', localStorage.getItem('isAuthenticated'));
    this.isAuthenticated = false;
    return this.http.get<any>(this.urldeconnexion);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}