import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { GameOverviewComponent } from './components/game/game-overview/game-overview.component';
import { JoinGameComponent } from './components/game/join-game/join-game.component';
import { StartGameComponent } from './components/game/start-game/start-game.component';
import { WaitForGameComponent } from './components/game/wait-for-game/wait-for-game.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FinalPresentationComponent } from './components/game/final-presentation/final-presentation.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //specify component from redirect
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: DrawingEditorComponent },
  { path: 'draw', component: DrawingEditorComponent },
  { path: 'write', component: TextInputComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'game', component: GameOverviewComponent },
  { path: 'start', component: StartGameComponent },
  { path: 'wait/:id', component: WaitForGameComponent },
  { path: 'results', component: FinalPresentationComponent },
  { path: 'gamescreen', component: GameScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
