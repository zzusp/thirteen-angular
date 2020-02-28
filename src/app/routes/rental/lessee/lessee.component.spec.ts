import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesseeComponent } from './lessee.component';

describe('LesseeComponent', () => {
  let component: LesseeComponent;
  let fixture: ComponentFixture<LesseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
