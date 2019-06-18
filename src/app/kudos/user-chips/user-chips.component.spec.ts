import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChipsComponent } from './user-chips.component';

describe('UserChipsComponent', () => {
  let component: UserChipsComponent;
  let fixture: ComponentFixture<UserChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
