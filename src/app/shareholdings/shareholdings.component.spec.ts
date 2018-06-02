import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdingsComponent } from './shareholdings.component';

describe('ShareholdingsComponent', () => {
  let component: ShareholdingsComponent;
  let fixture: ComponentFixture<ShareholdingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
