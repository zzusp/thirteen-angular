import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogLoginDetailComponent } from './log-login-detail.component';

describe('LogLoginDetailComponent', () => {
  let component: LogLoginDetailComponent;
  let fixture: ComponentFixture<LogLoginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogLoginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogLoginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
