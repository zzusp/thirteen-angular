import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizTypeEditComponent } from './biz-type-edit.component';

describe('BizTypeEditComponent', () => {
  let component: BizTypeEditComponent;
  let fixture: ComponentFixture<BizTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BizTypeEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
