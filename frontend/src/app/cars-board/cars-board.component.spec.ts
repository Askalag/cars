import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsBoardComponent } from './cars-board.component';

describe('CarsBoardComponent', () => {
  let component: CarsBoardComponent;
  let fixture: ComponentFixture<CarsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
