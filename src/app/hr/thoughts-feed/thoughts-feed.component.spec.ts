import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtsFeedComponent } from './thoughts-feed.component';

describe('ThoughtsFeedComponent', () => {
  let component: ThoughtsFeedComponent;
  let fixture: ComponentFixture<ThoughtsFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoughtsFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
