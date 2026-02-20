import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLogadoGuard } from './auth/guards/auth-logado/auth-logado.guard';
import { AuthGuard } from './auth/guards/auth/auth.guard';
import { RoleGuardGuard } from './auth/guards/roleGuard/role-guard.guard';
import { HeaderComponent } from './core/components/header/header.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
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
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [RoleGuardGuard]
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
