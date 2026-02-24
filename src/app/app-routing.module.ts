import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLogadoGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    canActivate: [AuthLogadoGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'chamados',
        loadChildren: () =>
          import('./chamados/chamados.module').then((m) => m.ChamadosModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'tecnicos',
        loadChildren: () =>
          import('./tecnicos/tecnicos.module').then((m) => m.TecnicosModule),
      },

      {
        path: 'manual-do-software',
        loadChildren: () =>
          import('./manual-do-software/manual-do-software.module').then((m) => m.ManualDoSoftwareModule),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
