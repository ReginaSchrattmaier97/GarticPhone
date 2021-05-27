import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { GameOverviewComponent } from './components/game/game-overview/game-overview.component';
import { JoinGameComponent } from './components/game/join-game/join-game.component';
import { StartGameComponent } from './components/game/start-game/start-game.component';
import { WaitForGameComponent } from './components/game/wait-for-game/wait-for-game.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FinalPresentationComponent } from './components/game/final-presentation/final-presentation.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { GameHostDirective } from './directives/game-host.directive';
import { UserState } from './store/user/user.states'
import { GameState } from './store/game/game.state';

@NgModule({
  declarations: [
    AppComponent,
    DrawingEditorComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    GameOverviewComponent,
    JoinGameComponent,
    StartGameComponent,
    WaitForGameComponent,
    TextInputComponent,
    FinalPresentationComponent,
    GameScreenComponent,
    GameHostDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxsModule.forRoot([
      UserState,
      GameState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
