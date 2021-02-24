import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContractComponent } from './rent-contract.component';

describe('RentContractComponent', () => {
  let component: RentContractComponent;
  let fixture: ComponentFixture<RentContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentContractComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
