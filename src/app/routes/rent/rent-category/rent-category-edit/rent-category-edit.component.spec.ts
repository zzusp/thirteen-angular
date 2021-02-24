import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCategoryEditComponent } from './rent-category-edit.component';

describe('RentCategoryEditComponent', () => {
  let component: RentCategoryEditComponent;
  let fixture: ComponentFixture<RentCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentCategoryEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
