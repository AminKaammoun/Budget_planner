import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormEditComponent } from './category-form-edit.component';

describe('CategoryFormEditComponent', () => {
  let component: CategoryFormEditComponent;
  let fixture: ComponentFixture<CategoryFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFormEditComponent]
    });
    fixture = TestBed.createComponent(CategoryFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
