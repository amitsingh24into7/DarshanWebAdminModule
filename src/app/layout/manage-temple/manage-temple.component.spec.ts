import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTempleComponent } from './manage-temple.component';

describe('ManageTempleComponent', () => {
  let component: ManageTempleComponent;
  let fixture: ComponentFixture<ManageTempleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTempleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
