import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IntroComponent } from './intro/intro.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { authGuard } from './auth.guard';
import { alreadyLoggedInGuard } from './already-logged-in.guard';
import { LaststepComponent } from './laststep/laststep.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent, canActivate: [authGuard] },
  { path: 'questionnaire', component: QuestionnaireComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent , canActivate: [alreadyLoggedInGuard]},
  { path: 'laststep', component: LaststepComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
