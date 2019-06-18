import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMessagesComponent } from './mood-messages.component';

describe('MoodMessagesComponent', () => {
  let component: MoodMessagesComponent;
  let fixture: ComponentFixture<MoodMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
