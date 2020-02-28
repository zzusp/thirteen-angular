import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOperationDetailComponent } from './log-operation-detail.component';

describe('LogOperationDetailComponent', () => {
  let component: LogOperationDetailComponent;
  let fixture: ComponentFixture<LogOperationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOperationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOperationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
