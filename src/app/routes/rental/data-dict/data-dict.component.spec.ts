import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDictComponent } from './data-dict.component';

describe('DataDictComponent', () => {
  let component: DataDictComponent;
  let fixture: ComponentFixture<DataDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataDictComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
