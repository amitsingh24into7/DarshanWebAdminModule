import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUrlFormComponent } from './donation-url-form.component';

describe('DonationUrlFormComponent', () => {
  let component: DonationUrlFormComponent;
  let fixture: ComponentFixture<DonationUrlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationUrlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
