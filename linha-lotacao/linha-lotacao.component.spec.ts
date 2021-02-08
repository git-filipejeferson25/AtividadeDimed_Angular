import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaLotacaoComponent } from './linha-lotacao.component';

describe('LinhaLotacaoComponent', () => {
  let component: LinhaLotacaoComponent;
  let fixture: ComponentFixture<LinhaLotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhaLotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhaLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
