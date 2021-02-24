import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBaseInfoComponent } from './rent-base-info.component';

describe('RentBaseInfoComponent', () => {
  let component: RentBaseInfoComponent;
  let fixture: ComponentFixture<RentBaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentBaseInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
