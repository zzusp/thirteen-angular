import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStopComponent } from './report-stop.component';

describe('ReportStopComponent', () => {
  let component: ReportStopComponent;
  let fixture: ComponentFixture<ReportStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
