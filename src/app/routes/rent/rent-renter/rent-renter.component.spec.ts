import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRenterComponent } from './rent-renter.component';

describe('RentRenterComponent', () => {
  let component: RentRenterComponent;
  let fixture: ComponentFixture<RentRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentRenterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
