import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniThoughtComponent } from './mini-thought.component';

describe('MiniThoughtComponent', () => {
  let component: MiniThoughtComponent;
  let fixture: ComponentFixture<MiniThoughtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniThoughtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniThoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
