import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/authentication/login/login.component'
import { RegisterComponent } from './components/authentication/register/register.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
    //specify component from redirect
  {path:'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:DrawingEditorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
