import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAuthorizeComponent } from './role-authorize.component';

describe('RoleAuthorizeComponent', () => {
  let component: RoleAuthorizeComponent;
  let fixture: ComponentFixture<RoleAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
