import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

interface MenuItem {
  link: string;
  label: string;
  icon: string;
}

const ROUTE_TITLES: Record<string, string> = {
  '/home': 'Pagina Inicial',
  '/chamados': 'Chamados',
  '/clientes': 'Clientes',
  '/tecnicos': 'Tecnicos',

  '/manual-do-software': 'Manual do Software',
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  private destroy$ = new Subject<void>();

  pageTitle = 'Pagina Inicial';
  isFullscreen = false;

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
    private router: Router,
  ) {}

  tokenExpirationDate!: Date | null;

  get emailUser() {
    return this.authService.emailUser;
  }

  get roleUser() {
    return this.authService.roleUser;
  }


  ngOnInit(): void {
    this.tokenExpirationDate = this.authService.getTokenExpirationDate();
    this.updatePageTitle(this.router.url);

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((e) => {
      this.updatePageTitle(e.urlAfterRedirects);
    });
  }

  private updatePageTitle(url: string): void {
    const base = '/' + (url.split('/')[1] || '');
    this.pageTitle = ROUTE_TITLES[base] || 'Helpr';
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  closeDrawer(): void {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  logout(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '360px',
      panelClass: 'dialog-rounded',
    });

    dialogRef.afterClosed().pipe(
      filter((result) => !!result),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.authService.onLogout();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByLink(index: number, item: MenuItem): string {
    return item.link;
  }

  itensMenu: MenuItem[] = [
    { link: '/home', label: 'Pagina inicial', icon: 'home' },
    { link: '/chamados', label: 'Chamados', icon: 'assignment' },
    { link: '/clientes', label: 'Clientes', icon: 'people' },
    { link: '/tecnicos', label: 'Tecnicos', icon: 'engineering' },
    { link: '/manual-do-software', label: 'Manual do Software', icon: 'list_alt' },
  ];
}
