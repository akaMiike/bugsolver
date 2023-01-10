import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/guards/auth-guard.service';

const routes: Routes = [
  {path: '', canActivateChild : [AuthGuardService], children:[
    {path: 'user', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)},
    {path: 'bugs', loadChildren: () => import('./bugs/bugs.module').then(b => b.BugsModule)},
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
