import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private apiUrl = 'http://localhost:8010/api/matiere';

  constructor(private http: HttpClient) { }

  createMatiere(nom: string, image: File, nomProf: string, imageProf: File): Observable<any> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('image', image);
    formData.append('nomProf', nomProf);
    formData.append('imageProf', imageProf);

    return this.http.post(`${this.apiUrl}/createMatiere`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllMatieres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllMatiere`)
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