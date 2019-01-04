import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakoutanalysisComponent } from './breakoutanalysis.component';

describe('BreakoutanalysisComponent', () => {
  let component: BreakoutanalysisComponent;
  let fixture: ComponentFixture<BreakoutanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakoutanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakoutanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
