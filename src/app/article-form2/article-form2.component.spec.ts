import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleForm2Component } from './article-form2.component';

describe('ArticleForm2Component', () => {
  let component: ArticleForm2Component;
  let fixture: ComponentFixture<ArticleForm2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleForm2Component]
    });
    fixture = TestBed.createComponent(ArticleForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
