import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)},
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
