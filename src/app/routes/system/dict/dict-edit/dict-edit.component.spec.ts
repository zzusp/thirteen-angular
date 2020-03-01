import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictEditComponent } from './dict-edit.component';

describe('DictEditComponent', () => {
  let component: DictEditComponent;
  let fixture: ComponentFixture<DictEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DictEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
