import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForGameComponent } from './wait-for-game.component';

describe('WaitForGameComponent', () => {
  let component: WaitForGameComponent;
  let fixture: ComponentFixture<WaitForGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitForGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
