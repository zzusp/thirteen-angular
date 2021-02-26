import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContractEditComponent } from './rent-contract-edit.component';

describe('RentContractEditComponent', () => {
  let component: RentContractEditComponent;
  let fixture: ComponentFixture<RentContractEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentContractEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
