import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameComponent } from './start-game.component';

describe('StartGameComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
