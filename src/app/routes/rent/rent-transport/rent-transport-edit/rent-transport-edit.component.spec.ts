import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTransportEditComponent } from './rent-transport-edit.component';

describe('RentTransportEditComponent', () => {
  let component: RentTransportEditComponent;
  let fixture: ComponentFixture<RentTransportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentTransportEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentTransportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
