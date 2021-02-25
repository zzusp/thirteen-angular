import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRenterEditComponent } from './rent-renter-edit.component';

describe('RentRenterEditComponent', () => {
  let component: RentRenterEditComponent;
  let fixture: ComponentFixture<RentRenterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentRenterEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
