import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniKudoComponent } from './mini-kudo.component';

describe('MiniKudoComponent', () => {
  let component: MiniKudoComponent;
  let fixture: ComponentFixture<MiniKudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniKudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniKudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
