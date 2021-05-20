import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverviewComponent } from './game-overview.component';

describe('GameOverviewComponent', () => {
  let component: GameOverviewComponent;
  let fixture: ComponentFixture<GameOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
