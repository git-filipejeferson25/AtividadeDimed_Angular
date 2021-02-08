import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LinhaLotacao } from './linha-lotacao';
import { LinhaLotacaoService } from './linha-lotacao.service';

@Component({
  selector: 'app-linha-lotacao',
  templateUrl: './linha-lotacao.component.html',
  styleUrls: ['./linha-lotacao.component.css']
})
export class LinhaLotacaoComponent implements OnInit {

  linhalotacao = {} as LinhaLotacao;
  linhalot: LinhaLotacao[] = [];

  constructor(private linhalotacaoService: LinhaLotacaoService) {}
  
  ngOnInit() {
    this.getLinhas();
  }

  // defini se uma linha será criada ou atualizada
  saveLinhaLotacao(form: NgForm) {
    if (this.linhalotacao.id !== undefined) {
      this.linhalotacaoService.updateLinhaLotacao(this.linhalotacao).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.linhalotacaoService.saveLinhaLotacao(this.linhalotacao).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // 
  getLinhas() {
    this.linhalotacaoService.getLinhaLotacao().subscribe((linhalot: LinhaLotacao[]) => {
      this.linhalot = linhalot;
    });
  }

  // 
  deleteLinhasLotacao(linhalotacao: LinhaLotacao) {
    this.linhalotacaoService.deleteLinhaLotacao(linhalotacao).subscribe(() => {
      this.getLinhas();
    });
  }

  // 
  editLinhasLotacao(linhalotacao: LinhaLotacao) {
    this.linhalotacao = { ...linhalotacao };
  }

  // 
  cleanForm(form: NgForm) {
    this.getLinhas();
    form.resetForm();
    this.linhalotacao = {} as LinhaLotacao;
  }

}