import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itinerario } from './itinerario';
import { ItinerarioService } from './itinerario.service';

@Component({
  selector: 'app-itinerario-unidade',
  templateUrl: './itinerario-unidade.component.html',
  styleUrls: ['./itinerario-unidade.component.css']
})
export class ItinerarioUnidadeComponent implements OnInit {

  itinerario = {} as Itinerario;
  itin: Itinerario[] = [];

  constructor(private itinerarioService: ItinerarioService) {}
  
  ngOnInit() {
    this.getLinhas();
  }

  // defini se uma linha será criada ou atualizada
  saveItinerario(form: NgForm) {
    if (this.itinerario.idlinha !== undefined) {
      this.itinerarioService.updateItinerario(this.itinerario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.itinerarioService.saveItinerario(this.itinerario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // 
  getLinhas() {
    this.itinerarioService.getItinerario().subscribe((itin: Itinerario[]) => {
      this.itin = itin;
    });
  }

  // 
  deleteItinerario(itinerario: Itinerario) {
    this.itinerarioService.deleteItinerario(itinerario).subscribe(() => {
      this.getLinhas();
    });
  }

  // 
  editItinerario(itinerario: Itinerario) {
    this.itinerario = { ...itinerario };
  }

  // 
  cleanForm(form: NgForm) {
    this.getLinhas();
    form.resetForm();
    this.itinerario = {} as Itinerario;
  }

}
