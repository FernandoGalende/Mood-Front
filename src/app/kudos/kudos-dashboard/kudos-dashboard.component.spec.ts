import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosDashboardComponent } from './kudos-dashboard.component';

describe('KudosDashboardComponent', () => {
  let component: KudosDashboardComponent;
  let fixture: ComponentFixture<KudosDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KudosDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KudosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
