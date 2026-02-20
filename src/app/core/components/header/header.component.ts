import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

interface MenuItem {
  link: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
  tokenExpirationDate!: Date | null;

  get emailUser() {
    return this.authService.emailUser;
  }

  get roleUser() {
    return this.authService.roleUser;
  }

  get userAdmin() {
    return this.authService.roleUser === 'Admin';
  }

  ngOnInit(): void {
    this.tokenExpirationDate = this.authService.getTokenExpirationDate();
    if (this.authService.isAuthenticated && !this.authService.roleUser) {
      this.authService.loadUserRole().pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  logout(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  itensMenu: MenuItem[] = [
    {
      link: '/home',
      label: 'Página inicial',
      icon: 'home',
    },
    {
      link: '/chamados',
      label: 'Chamados',
      icon: 'assignment',
    },
    {
      link: '/clientes',
      label: 'Clientes',
      icon: 'people',
    },
    {
      link: '/tecnicos',
      label: 'Técnicos',
      icon: 'engineering',
    },
    {
      link: '/manual-do-software',
      label: 'Manual do Software',
      icon: 'list_alt',
    },
  ];
}
