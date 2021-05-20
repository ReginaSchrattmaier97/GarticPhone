import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPresentationComponent } from './final-presentation.component';

describe('FinalPresentationComponent', () => {
  let component: FinalPresentationComponent;
  let fixture: ComponentFixture<FinalPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalPresentationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
