import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LinhaOnibus } from './linha-onibus';

@Injectable({
  providedIn: 'root'
})
export class LinhaOnibusService {

 url = 'http://localhost:3000/linhabus'
  //url = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o'

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os carros
  getLinhaonibus(): Observable<LinhaOnibus[]> {
    return this.httpClient.get<LinhaOnibus[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma linha pelo id
  getLinhaOnibusById(id: number): Observable<LinhaOnibus> {
    return this.httpClient.get<LinhaOnibus>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma linha
  saveLinhaOnibus(linhaonibus: LinhaOnibus): Observable<LinhaOnibus> {
    return this.httpClient.post<LinhaOnibus>(this.url, JSON.stringify(linhaonibus), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma linha
  updateLinhaOnibus(linhaonibus: LinhaOnibus): Observable<LinhaOnibus> {
    return this.httpClient.put<LinhaOnibus>(this.url + '/' + linhaonibus.id, JSON.stringify(linhaonibus), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma linha
  deleteLinhaOnibus(linhaonibus: LinhaOnibus) {
    return this.httpClient.delete<LinhaOnibus>(this.url + '/' + linhaonibus.id, this.httpOptions)
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