import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourTimeComponent } from './tour-time.component';

describe('TourTimeComponent', () => {
  let component: TourTimeComponent;
  let fixture: ComponentFixture<TourTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
