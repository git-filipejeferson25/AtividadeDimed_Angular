import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Itinerario } from './itinerario';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

 url = 'http://localhost:3000/itinerario'

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as linhas
  getItinerario(): Observable<Itinerario[]> {
    return this.httpClient.get<Itinerario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma linha pelo id
  getItinerarioById(idlinha: number): Observable<Itinerario> {
    return this.httpClient.get<Itinerario>(this.url + '/' + idlinha)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma linha
  saveItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.httpClient.post<Itinerario>(this.url, JSON.stringify(itinerario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma linha alterada
  updateItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.httpClient.put<Itinerario>(this.url + '/' + itinerario.idlinha, JSON.stringify(itinerario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma linha selecionda
  deleteItinerario(itinerario: Itinerario) {
    return this.httpClient.delete<Itinerario>(this.url + '/' + itinerario.idlinha, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}