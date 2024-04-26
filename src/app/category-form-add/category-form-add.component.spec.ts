import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormAddComponent } from './category-form-add.component';

describe('CategoryFormAddComponent', () => {
  let component: CategoryFormAddComponent;
  let fixture: ComponentFixture<CategoryFormAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFormAddComponent]
    });
    fixture = TestBed.createComponent(CategoryFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
