import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleImageComponent } from './temple-image.component';

describe('TempleImageComponent', () => {
  let component: TempleImageComponent;
  let fixture: ComponentFixture<TempleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
