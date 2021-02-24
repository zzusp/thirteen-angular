import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCategoryComponent } from './rent-category.component';

describe('RentCategoryComponent', () => {
  let component: RentCategoryComponent;
  let fixture: ComponentFixture<RentCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
