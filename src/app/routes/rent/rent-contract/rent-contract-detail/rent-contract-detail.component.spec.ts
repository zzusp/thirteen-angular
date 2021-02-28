import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContractDetailComponent } from './rent-contract-detail.component';

describe('RentContractDetailComponent', () => {
  let component: RentContractDetailComponent;
  let fixture: ComponentFixture<RentContractDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentContractDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
