import type { Task } from '../types/task'

export const MOCK_REFERENCE_DATE = new Date()

function dateFromReference(days: number, hour = 18) {
  const date = new Date(MOCK_REFERENCE_DATE)

  date.setDate(date.getDate() + days)

  date.setHours(hour, 0, 0, 0)

  return date.toISOString()
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Corrigir bug na tela de login',
    description: 'Corrigir falha encontrada durante autenticação.',
    status: 'pending',
    priority: 'urgent',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-2),
    dueDate: dateFromReference(-2),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 2,
    title: 'Implementar filtro de tarefas',
    description: 'Adicionar filtros para organização da listagem.',
    status: 'in_progress',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-5),
    dueDate: dateFromReference(8),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 3,
    title: 'Criar testes unitários da API',
    description: 'Adicionar cobertura para fluxos principais.',
    status: 'completed',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-8),
    dueDate: dateFromReference(-25),

    completionReport: 'Testes principais adicionados.',
    completedAt: dateFromReference(-1, 16),
  },

  {
    id: 4,
    title: 'Revisar responsividade mobile',
    description: 'Validar comportamento das principais telas.',
    status: 'in_progress',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-4),
    dueDate: dateFromReference(-40),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 5,
    title: 'Documentar endpoints da API',
    description: 'Documentar contratos atualmente disponíveis.',
    status: 'pending',
    priority: 'low',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-1),
    dueDate: dateFromReference(-65),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 6,
    title: 'Otimizar carregamento da dashboard',
    description: 'Revisar renderização e carregamento inicial.',
    status: 'pending',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(0),
    dueDate: dateFromReference(35),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 7,
    title: 'Corrigir página 404',
    description: 'Ajustar layout da página não encontrada.',
    status: 'completed',
    priority: 'low',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-15),
    dueDate: dateFromReference(14),

    completionReport: 'Página corrigida.',
    completedAt: dateFromReference(-10),
  },

  {
    id: 8,
    title: 'Revisar permissões da aplicação',
    description: 'Revisar regras atuais de acesso.',
    status: 'in_progress',
    priority: 'urgent',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-10),
    dueDate: dateFromReference(35),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 9,
    title: 'Atualizar dependências',
    description: 'Atualizar dependências do frontend.',
    status: 'completed',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-20),
    dueDate: dateFromReference(70),

    completionReport: 'Dependências atualizadas.',
    completedAt: dateFromReference(-12),
  },

  {
    id: 10,
    title: 'Criar tela de perfil',
    description: 'Implementar interface inicial de perfil.',
    status: 'pending',
    priority: 'low',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-18),
    dueDate: dateFromReference(20),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 11,
    title: 'Ajustar validação de formulário',
    description: 'Revisar mensagens de validação.',
    status: 'completed',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-3),
    dueDate: dateFromReference(1),

    completionReport: 'Validações atualizadas.',
    completedAt: dateFromReference(0, 10),
  },

  {
    id: 12,
    title: 'Revisar layout de Minhas tarefas',
    description: 'Validar estrutura do Kanban.',
    status: 'pending',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-1),
    dueDate: dateFromReference(7),

    completionReport: null,
    completedAt: null,
  },
  {
    id: 13,
    title: 'Corrigir bug na tela de login',
    description: 'Corrigir falha encontrada durante autenticação.',
    status: 'pending',
    priority: 'urgent',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-2),
    dueDate: dateFromReference(0),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 14,
    title: 'Implementar filtro de tarefas',
    description: 'Adicionar filtros para organização da listagem.',
    status: 'in_progress',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-5),
    dueDate: dateFromReference(2),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 15,
    title: 'Criar testes unitários da API',
    description: 'Adicionar cobertura aos principais casos de uso.',
    status: 'completed',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-10),
    dueDate: dateFromReference(-4),

    completionReport: 'Testes implementados e executados.',
    completedAt: dateFromReference(-3),
  },

  {
    id: 16,
    title: 'Revisar responsividade mobile',
    description: 'Validar comportamento das principais telas.',
    status: 'in_progress',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-8),
    dueDate: dateFromReference(-1),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 17,
    title: 'Documentar endpoints da API',
    description: 'Documentar contratos atualmente disponíveis.',
    status: 'pending',
    priority: 'low',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-1),
    dueDate: dateFromReference(5),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 18,
    title: 'Otimizar carregamento de tarefas',
    description: 'Revisar renderização e carregamento final.',
    status: 'pending',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(0),
    dueDate: dateFromReference(15),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 19,
    title: 'Configurar tokens de tema',
    description: 'Finalizar tokens dos temas claro e escuro.',
    status: 'completed',
    priority: 'low',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-6),
    dueDate: dateFromReference(1),

    completionReport: 'Tokens configurados e revisados.',
    completedAt: dateFromReference(0),
  },

  {
    id: 20,
    title: 'Revisar permissões da aplicação',
    description: 'Revisar regras atuais de acesso.',
    status: 'in_progress',
    priority: 'urgent',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-10),
    dueDate: dateFromReference(4),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 21,
    title: 'Corrigir navegação da sidebar',
    description: 'Corrigir comportamento das rotas de navegação.',
    status: 'pending',
    priority: 'high',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-14),
    dueDate: dateFromReference(-3),

    completionReport: null,
    completedAt: null,
  },

  {
    id: 22,
    title: 'Configurar estrutura inicial do projeto',
    description: 'Preparar estrutura inicial da aplicação web.',
    status: 'completed',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-20),
    dueDate: dateFromReference(-7),

    completionReport: 'Estrutura inicial configurada.',
    completedAt: dateFromReference(-6),
  },

  {
    id: 23,
    title: 'Criar layout base da aplicação',
    description: 'Implementar layout com sidebar e conteúdo.',
    status: 'completed',
    priority: 'urgent',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-3),
    dueDate: dateFromReference(3),

    completionReport: 'Layout implementado.',
    completedAt: dateFromReference(-1),
  },

  {
    id: 24,
    title: 'Revisar layout de Minhas tarefas',
    description: 'Validar estrutura do Kanban.',
    status: 'pending',
    priority: 'medium',

    createdByUserId: 1,
    assignedToUserId: 2,
    companyId: 1,

    createdAt: dateFromReference(-1),
    dueDate: dateFromReference(7),

    completionReport: null,
    completedAt: null,
  },
]
