import { Component } from '@angular/core';

interface HelpTopic {
  label: string;
  icon: string;
  items: HelpItem[];
}

interface HelpItem {
  label: string;
  title: string;
  description: string;
  steps?: string[];
  note?: string;
  images?: { src: string; caption: string }[];
}

@Component({
  selector: 'app-manual-do-software',
  templateUrl: './manual-do-software.component.html',
  styleUrls: ['./manual-do-software.component.scss'],
})
export class ManualDoSoftwareComponent {
  activeTopic: HelpTopic | null = null;
  activeItem: HelpItem | null = null;

  topics: HelpTopic[] = [
    {
      label: 'Erros',
      icon: 'error_outline',
      items: [
        {
          label: 'Erro 500',
          title: 'Erro 500 - CPF Invalido',
          description:
            'O Erro 500 ocorre quando o preenchimento do CPF e invalido. Esse erro pode se dar por um digito incorreto no CPF informado, por falta de um digito, ou similar.',
          steps: [
            'Confira se o CPF esta correto.',
            'Verifique se todos os digitos foram informados.',
            'Caso o CPF esteja correto e o erro persista, contate a Equipe de Suporte.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CpfInvalid.png',
              caption: 'Exemplo de CPF invalido',
            },
          ],
        },
        {
          label: 'Erro 409',
          title: 'Erro 409 - Conflito de Dados',
          description:
            'O Erro 409 ocorre quando ha conflito com a informacao dada com o nosso sistema, possivelmente ja tendo sido usada para a criacao de um cliente ou tecnico.',
          steps: [
            'Verifique se o CPF ou email ja esta cadastrado.',
            'Caso seja o primeiro cadastro e tenha esse erro, entre em contato com a Equipe de Suporte.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CpfAlreadyRegisteredCut.png',
              caption: 'CPF ja cadastrado',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/EmailAlreadyRegisteredCut.png',
              caption: 'Email ja cadastrado',
            },
          ],
        },
        {
          label: 'Erro 404',
          title: 'Erro 404 - Pagina Nao Encontrada',
          description:
            'O Erro 404 ocorre quando o link/endereco nao e encontrado. E possivel que nosso sistema tenha saido do ar.',
          steps: [
            'Aguarde um periodo e tente se reconectar.',
            'Caso o erro persista por muito tempo, entre em contato com a Equipe de Suporte.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/404Page.png',
              caption: 'Pagina 404',
            },
          ],
        },
        {
          label: 'Erro 403',
          title: 'Erro 403 - Acesso Negado',
          description:
            'O Erro 403 ocorre quando se e tentado fazer uma operacao que sua conta nao tem acesso permitido.',
          steps: [
            'Verifique qual e o seu tipo de conta.',
            'Caso precise modificar as permissoes, siga as etapas de edicao contidas no manual do seu tipo de conta.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/403Error.png',
              caption: 'Erro 403',
            },
          ],
        },
      ],
    },
    {
      label: 'Clientes',
      icon: 'people',
      items: [
        {
          label: 'Criar Cliente',
          title: 'Como criar um Cliente',
          description: 'Para criar um cliente no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Clientes".',
            'Clique no botao "Novo cliente".',
            'Preencha o formulario com os dados do cliente e clique em "Criar".',
          ],
          note: 'A caixa "Cliente" deve estar assinalada. Selecionar outras caixas somente com autorizacao dos supervisores.',
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ButtonClient1.png',
              caption: 'Fig.1 - Menu lateral',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateClient2.png',
              caption: 'Fig.2 - Novo cliente',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateClient3.png',
              caption: 'Fig.3 - Formulario de criacao',
            },
          ],
        },
        {
          label: 'Editar Cliente',
          title: 'Como Modificar um Cliente',
          description: 'Para modificar um cliente no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Clientes".',
            'Na tabela, encontre o cliente e va na coluna "Acoes".',
            'Clique no icone de lapis para editar.',
            'Modifique os dados no formulario e clique em "Salvar".',
            'Para excluir, clique no icone de lixeira.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ModifyClienteAndTecnico.png',
              caption: 'Fig.1 - Area de acoes',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/EditCliente.png',
              caption: 'Fig.2 - Formulario de edicao',
            },
          ],
        },
        {
          label: 'Informacoes de Cliente',
          title: 'Informacoes do Cliente',
          description:
            'Para acessar as informacoes do cliente, abra o menu lateral e selecione "Clientes". Voce tera acesso a uma tabela com todos os clientes e seus dados.',
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/InformationsClient.png',
              caption: 'Tabela de clientes',
            },
          ],
        },
      ],
    },
    {
      label: 'Tecnicos',
      icon: 'engineering',
      items: [
        {
          label: 'Criar Tecnico',
          title: 'Como criar um Tecnico',
          description: 'Para criar um tecnico no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Tecnicos".',
            'Clique no botao "Novo Tecnico".',
            'Preencha o formulario com os dados do tecnico e clique em "Criar".',
          ],
          note: 'A caixa "Tecnico" deve estar assinalada. Selecionar outras caixas somente com autorizacao dos supervisores.',
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ButtonTecnico1.png',
              caption: 'Fig.1 - Menu lateral',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateTecnico2.png',
              caption: 'Fig.2 - Novo tecnico',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateTecnico3.png',
              caption: 'Fig.3 - Formulario de criacao',
            },
          ],
        },
        {
          label: 'Editar Tecnico',
          title: 'Como Modificar um Tecnico',
          description: 'Para modificar um tecnico no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Tecnicos".',
            'Na tabela, encontre o tecnico e va na coluna "Acoes".',
            'Clique no icone de lapis para editar.',
            'Modifique os dados no formulario e clique em "Salvar".',
            'Para excluir, clique no icone de lixeira.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ModifyClienteAndTecnico.png',
              caption: 'Fig.1 - Area de acoes',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/EditTecnico.png',
              caption: 'Fig.2 - Formulario de edicao',
            },
          ],
        },
        {
          label: 'Informacoes de Tecnico',
          title: 'Informacoes do Tecnico',
          description:
            'Para acessar as informacoes do tecnico, abra o menu lateral e selecione "Tecnicos". Voce tera acesso a uma tabela com todos os tecnicos e seus dados.',
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/InformationsTecnico.png',
              caption: 'Tabela de tecnicos',
            },
          ],
        },
      ],
    },
    {
      label: 'Chamados',
      icon: 'assignment',
      items: [
        {
          label: 'Criar Chamado',
          title: 'Como criar um Chamado',
          description: 'Para criar um chamado no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Chamados".',
            'Clique no botao "Novo Chamado".',
            'Preencha o formulario com os dados do chamado e clique em "Criar".',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ButtonChamados1.png',
              caption: 'Fig.1 - Menu lateral',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateChamados2.png',
              caption: 'Fig.2 - Novo chamado',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/CreateChamados3.png',
              caption: 'Fig.3 - Formulario de criacao',
            },
          ],
        },
        {
          label: 'Editar Chamado',
          title: 'Como Modificar um Chamado',
          description: 'Para modificar um chamado no sistema, siga as seguintes etapas:',
          steps: [
            'Abra o menu lateral e selecione "Chamados".',
            'Na tabela, encontre o chamado e va na coluna "Acoes".',
            'Clique no icone de lapis para editar.',
            'Modifique os dados no formulario e clique em "Salvar".',
            'Para excluir, clique no icone de lixeira.',
          ],
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/ModifyClienteAndTecnico.png',
              caption: 'Fig.1 - Area de acoes',
            },
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/EditChamado.png',
              caption: 'Fig.2 - Formulario de edicao',
            },
          ],
        },
        {
          label: 'Informacoes de Chamado',
          title: 'Informacoes do Chamado',
          description:
            'Para acessar as informacoes dos chamados, abra o menu lateral e selecione "Chamados". Voce tera acesso a uma tabela com todos os chamados e seus dados.',
          images: [
            {
              src: 'https://raw.githubusercontent.com/victoricoma/helpr/main/img/imgAjuda/InformationsTecnico.png',
              caption: 'Tabela de chamados',
            },
          ],
        },
      ],
    },
  ];

  selectTopic(topic: HelpTopic): void {
    if (this.activeTopic === topic) {
      this.activeTopic = null;
      this.activeItem = null;
    } else {
      this.activeTopic = topic;
      this.activeItem = null;
    }
  }

  selectItem(item: HelpItem): void {
    this.activeItem = item;
  }
}
