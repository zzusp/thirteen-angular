import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOperationComponent } from './log-operation.component';

describe('LogOperationComponent', () => {
  let component: LogOperationComponent;
  let fixture: ComponentFixture<LogOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogOperationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
