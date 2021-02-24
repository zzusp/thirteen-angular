import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentItemComponent } from './rent-item.component';

describe('RentItemComponent', () => {
  let component: RentItemComponent;
  let fixture: ComponentFixture<RentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
