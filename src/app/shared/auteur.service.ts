import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {
  

  private apiUrl = 'https://angular17back.onrender.com/api/auteur';

  constructor(private http: HttpClient) { }

  createAuteur(nom: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('photo', photo);

    return this.http.post(`${this.apiUrl}/createAuteur`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllAuteurs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllAuteur`)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteAuteur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAuteur/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  

}
