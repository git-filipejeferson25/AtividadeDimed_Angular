import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LinhaLotacao } from './linha-lotacao';

@Injectable({
  providedIn: 'root'
})
export class LinhaLotacaoService {

 url = 'http://localhost:3000/linhalotacao'

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as linhas
  getLinhaLotacao(): Observable<LinhaLotacao[]> {
    return this.httpClient.get<LinhaLotacao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma linha pelo id
  getLinhaLotacaoById(id: number): Observable<LinhaLotacao> {
    return this.httpClient.get<LinhaLotacao>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma linha de lotação
  saveLinhaLotacao(linhalotacao: LinhaLotacao): Observable<LinhaLotacao> {
    return this.httpClient.post<LinhaLotacao>(this.url, JSON.stringify(linhalotacao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma linha alterada
  updateLinhaLotacao(linhalotacao: LinhaLotacao): Observable<LinhaLotacao> {
    return this.httpClient.put<LinhaLotacao>(this.url + '/' + linhalotacao.id, JSON.stringify(linhalotacao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma linha selecionda
  deleteLinhaLotacao(linhalotacao: LinhaLotacao) {
    return this.httpClient.delete<LinhaLotacao>(this.url + '/' + linhalotacao.id, this.httpOptions)
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