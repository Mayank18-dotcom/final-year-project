import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalreminderComponent } from './renewalreminder.component';

describe('RenewalreminderComponent', () => {
  let component: RenewalreminderComponent;
  let fixture: ComponentFixture<RenewalreminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalreminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
