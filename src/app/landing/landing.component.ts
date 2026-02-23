import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  features: Feature[] = [
    {
      icon: 'assignment',
      title: 'Gestao de Chamados',
      description: 'Crie, acompanhe e resolva chamados com prioridade e status em tempo real.',
    },
    {
      icon: 'people',
      title: 'Cadastro de Clientes',
      description: 'Gerencie clientes com perfis, historico de chamados e informacoes centralizadas.',
    },
    {
      icon: 'engineering',
      title: 'Equipe Tecnica',
      description: 'Atribua tecnicos aos chamados e acompanhe a produtividade da equipe.',
    },
    {
      icon: 'bar_chart',
      title: 'Dashboard em Tempo Real',
      description: 'Visualize metricas e estatisticas dos chamados na pagina inicial.',
    },
    {
      icon: 'security',
      title: 'Controle de Acesso',
      description: 'Sistema de autenticacao JWT com perfis de Admin, Tecnico e Cliente.',
    },
    {
      icon: 'devices',
      title: 'Design Responsivo',
      description: 'Interface adaptavel para desktop, tablet e dispositivos moveis.',
    },
  ];

  stats: Stat[] = [
    { value: '3', label: 'Perfis de usuario' },
    { value: '100%', label: 'Responsivo' },
    { value: 'JWT', label: 'Autenticacao' },
    { value: 'SaaS', label: 'Arquitetura' },
  ];

  steps: Step[] = [
    {
      number: '01',
      title: 'Cadastre',
      description: 'Registre clientes e tecnicos com seus respectivos perfis de acesso.',
      icon: 'person_add',
    },
    {
      number: '02',
      title: 'Crie Chamados',
      description: 'Abra chamados com titulo, prioridade, status e atribua a um tecnico.',
      icon: 'post_add',
    },
    {
      number: '03',
      title: 'Acompanhe',
      description: 'Monitore o progresso pelo dashboard e gerencie em tempo real.',
      icon: 'trending_up',
    },
  ];

  techStack = [
    'Angular 14',
    'Angular Material',
    'RxJS',
    'TypeScript',
    'JWT Auth',
    'SCSS',
    'REST API',
    'PWA',
  ];
}
