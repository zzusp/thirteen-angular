import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogLoginComponent } from './log-login.component';

describe('LogLoginComponent', () => {
  let component: LogLoginComponent;
  let fixture: ComponentFixture<LogLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
