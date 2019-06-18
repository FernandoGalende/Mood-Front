import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThoughtsComponent } from './user-thoughts.component';

describe('UserThoughtsComponent', () => {
  let component: UserThoughtsComponent;
  let fixture: ComponentFixture<UserThoughtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserThoughtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
