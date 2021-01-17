import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmTableComponent } from './dm-table.component';

describe('DmTableComponent', () => {
  let component: DmTableComponent;
  let fixture: ComponentFixture<DmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
