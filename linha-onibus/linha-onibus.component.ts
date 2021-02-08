import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { LinhaOnibus } from './linha-onibus';
import { LinhaOnibusService } from './linha-onibus.service';

@Component({
  selector: 'app-linha-onibus',
  templateUrl: './linha-onibus.component.html',
  styleUrls: ['./linha-onibus.component.css']
})
export class LinhaOnibusComponent implements OnInit {

  linhaonibus = {} as LinhaOnibus;
  linhabus: LinhaOnibus[] = [];

  constructor(private linhaonibusService: LinhaOnibusService, private http: HttpClient) {}
  
  ngOnInit() {
    this.getLinhas();

    
  }

  // defini se uma linha será criado ou atualizado
  saveLinhaOnibus(form: NgForm) {
    if (this.linhaonibus.id !== undefined) {
      this.linhaonibusService.updateLinhaOnibus(this.linhaonibus).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.linhaonibusService.saveLinhaOnibus(this.linhaonibus).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // 
  getLinhas() {
    this.linhaonibusService.getLinhaonibus().subscribe((linhabus: LinhaOnibus[]) => {
      this.linhabus = linhabus;
    });
  }

 
  // 
  deleteLinhasOnibus(linhaonibus: LinhaOnibus) {
    this.linhaonibusService.deleteLinhaOnibus(linhaonibus).subscribe(() => {
      this.getLinhas();
    });
  }

  // 
  editLinhasOnibus(linhaonibus: LinhaOnibus) {
    this.linhaonibus = { ...linhaonibus };
  }

  // 
  cleanForm(form: NgForm) {
    this.getLinhas();
    form.resetForm();
    this.linhaonibus = {} as LinhaOnibus;
  }

}