import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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

  onSubmit() {
    const { email, senha } = this.loginForm.getRawValue();

    const ref = this.toast.loading('Fazendo login...');

    this.authService.login(email, senha).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
        this.authService.loadUserRole().subscribe({
          next: () => {
            ref.close();
            this.router.navigate(['/']);
            this.toast.success('Seja bem-vindo(a)!');
          },
          error: () => {
            ref.close();
            this.toast.error('Nao foi possivel carregar o perfil do usuario');
          },
        });
      },
      error: (err) => {
        window.navigator?.vibrate?.(200);
        this.toast.error('Email/senha inválido(s)');
        ref.close();
      },
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }
}
