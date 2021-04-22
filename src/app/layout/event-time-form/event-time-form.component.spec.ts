import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeFormComponent } from './event-time-form.component';

describe('EventTimeFormComponent', () => {
  let component: EventTimeFormComponent;
  let fixture: ComponentFixture<EventTimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
