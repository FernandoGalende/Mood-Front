import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtsDetailComponent } from './thoughts-detail.component';

describe('ThoughtsDetailComponent', () => {
  let component: ThoughtsDetailComponent;
  let fixture: ComponentFixture<ThoughtsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoughtsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
