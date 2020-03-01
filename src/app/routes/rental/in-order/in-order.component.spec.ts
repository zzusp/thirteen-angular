import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InOrderComponent } from './in-order.component';

describe('InOrderComponent', () => {
  let component: InOrderComponent;
  let fixture: ComponentFixture<InOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
