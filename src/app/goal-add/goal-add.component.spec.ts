import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAddComponent } from './goal-add.component';

describe('GoalAddComponent', () => {
  let component: GoalAddComponent;
  let fixture: ComponentFixture<GoalAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalAddComponent]
    });
    fixture = TestBed.createComponent(GoalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
