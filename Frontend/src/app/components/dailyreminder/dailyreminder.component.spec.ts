import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyreminderComponent } from './dailyreminder.component';

describe('DailyreminderComponent', () => {
  let component: DailyreminderComponent;
  let fixture: ComponentFixture<DailyreminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyreminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
