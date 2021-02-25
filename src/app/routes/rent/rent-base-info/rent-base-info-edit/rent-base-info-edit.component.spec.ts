import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBaseInfoEditComponent } from './rent-base-info-edit.component';

describe('RentBaseInfoEditComponent', () => {
  let component: RentBaseInfoEditComponent;
  let fixture: ComponentFixture<RentBaseInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentBaseInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBaseInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
