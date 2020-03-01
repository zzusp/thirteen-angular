import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptEditComponent } from './dept-edit.component';

describe('DeptEditComponent', () => {
  let component: DeptEditComponent;
  let fixture: ComponentFixture<DeptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeptEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
