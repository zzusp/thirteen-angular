import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentSpecComponent } from './rent-spec.component';

describe('RentSpecComponent', () => {
  let component: RentSpecComponent;
  let fixture: ComponentFixture<RentSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentSpecComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
