import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioUnidadeComponent } from './itinerario-unidade.component';

describe('ItinerarioUnidadeComponent', () => {
  let component: ItinerarioUnidadeComponent;
  let fixture: ComponentFixture<ItinerarioUnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinerarioUnidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarioUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
