import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmTableEditComponent } from './dm-table-edit.component';

describe('DmTableEditComponent', () => {
  let component: DmTableEditComponent;
  let fixture: ComponentFixture<DmTableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmTableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
