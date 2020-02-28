import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizTypeComponent } from './biz-type.component';

describe('BizTypeComponent', () => {
  let component: BizTypeComponent;
  let fixture: ComponentFixture<BizTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
