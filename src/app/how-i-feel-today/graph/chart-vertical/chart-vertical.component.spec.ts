import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVerticalComponent } from './chart-vertical.component';

describe('ChartVerticalComponent', () => {
  let component: ChartVerticalComponent;
  let fixture: ComponentFixture<ChartVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartVerticalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
