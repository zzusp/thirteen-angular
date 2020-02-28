import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOrderComponent } from './out-order.component';

describe('OutOrderComponent', () => {
  let component: OutOrderComponent;
  let fixture: ComponentFixture<OutOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
