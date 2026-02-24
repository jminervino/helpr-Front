import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { tap } from 'rxjs';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private titleService: Title
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]],
  });

  ocultar = true;
  loading = false;

  onSubmit() {
    if (this.loading) return;
    this.loading = true;

    const { email, senha } = this.loginForm.getRawValue();
    const ref = this.toast.loading('Fazendo login...');

    this.authService.login(email, senha).pipe(
      tap((response) => {
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
      })
    ).subscribe({
      next: () => {
        this.loading = false;
        ref.close();
        this.router.navigate(['/']);
        this.toast.success('Seja bem-vindo(a)!');
        this.authService.loadUserRole().subscribe();
      },
      error: () => {
        this.loading = false;
        window.navigator?.vibrate?.(200);
        ref.close();
        this.toast.error('Email/senha inválido(s)');
      },
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }
}
