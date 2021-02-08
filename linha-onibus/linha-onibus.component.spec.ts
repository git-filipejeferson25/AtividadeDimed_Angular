import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaOnibusComponent } from './linha-onibus.component';

describe('LinhaOnibusComponent', () => {
  let component: LinhaOnibusComponent;
  let fixture: ComponentFixture<LinhaOnibusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhaOnibusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhaOnibusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
