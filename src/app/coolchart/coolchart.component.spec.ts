import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolchartComponent } from './coolchart.component';

describe('CoolchartComponent', () => {
  let component: CoolchartComponent;
  let fixture: ComponentFixture<CoolchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
