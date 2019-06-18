import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGraphComponent } from './hr-graph.component';

describe('HrGraphComponent', () => {
  let component: HrGraphComponent;
  let fixture: ComponentFixture<HrGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
