import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentItemEditComponent } from './rent-item-edit.component';

describe('RentItemEditComponent', () => {
  let component: RentItemEditComponent;
  let fixture: ComponentFixture<RentItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentItemEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
