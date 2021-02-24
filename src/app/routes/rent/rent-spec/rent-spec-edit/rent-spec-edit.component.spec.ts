import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentSpecEditComponent } from './rent-spec-edit.component';

describe('RentSpecEditComponent', () => {
  let component: RentSpecEditComponent;
  let fixture: ComponentFixture<RentSpecEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentSpecEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentSpecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
