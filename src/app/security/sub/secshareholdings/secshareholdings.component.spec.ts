import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecshareholdingsComponent } from './secshareholdings.component';

describe('SecshareholdingsComponent', () => {
  let component: SecshareholdingsComponent;
  let fixture: ComponentFixture<SecshareholdingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecshareholdingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecshareholdingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
