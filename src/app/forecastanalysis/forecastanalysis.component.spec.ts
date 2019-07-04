import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastanalysisComponent } from './forecastanalysis.component';

describe('ForecastanalysisComponent', () => {
  let component: ForecastanalysisComponent;
  let fixture: ComponentFixture<ForecastanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
