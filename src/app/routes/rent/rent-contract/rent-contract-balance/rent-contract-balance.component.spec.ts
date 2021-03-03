import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContractBalanceComponent } from './rent-contract-balance.component';

describe('RentContractBalanceComponent', () => {
  let component: RentContractBalanceComponent;
  let fixture: ComponentFixture<RentContractBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentContractBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentContractBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
