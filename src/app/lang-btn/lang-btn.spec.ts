import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangBtn } from './lang-btn';

describe('LangBtn', () => {
  let component: LangBtn;
  let fixture: ComponentFixture<LangBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
