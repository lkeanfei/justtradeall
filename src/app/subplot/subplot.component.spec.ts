import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubplotComponent } from './subplot.component';

describe('SubplotComponent', () => {
  let component: SubplotComponent;
  let fixture: ComponentFixture<SubplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
