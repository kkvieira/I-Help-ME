// ═══════════════════════════════════════════════
//  data.js — I Help ME mock database
// ═══════════════════════════════════════════════

const VIDEOS = [
  // ── HIDRÁULICA ──
  {
    id: 'h001', cat: 'hidraulica', emoji: '🔧',
    title: 'Como trocar o registro de pressão sem chamar o encanador',
    desc: 'Neste vídeo você aprende passo a passo como substituir um registro de pressão que está com vazamento, usando ferramentas simples que qualquer um tem em casa. Vamos ver os tipos de registro, como cortar a água, remover o registro antigo, aplicar veda rosca corretamente e instalar o novo registro sem que haja nenhum vazamento.',
    author: 'Carlos Encanamentos', authorInitials: 'CE',
    views: '128 mil', date: 'há 3 dias', duration: '18:42',
    thumb: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800',
    videoFile: 'videos/torneira_pingando.mp4',
    difficulty: 'iniciante', likes: 4320,
    tags: ['registro', 'encanamento', 'cano PVC', 'vazamento', 'reforma'],
    timeline: [
      { time: '0:00', text: 'Introdução e ferramentas necessárias' },
      { time: '2:15', text: 'Como fechar o registro geral' },
      { time: '4:30', text: 'Removendo o registro antigo' },
      { time: '8:10', text: 'Aplicando veda rosca' },
      { time: '12:40', text: 'Instalando o novo registro' },
      { time: '16:20', text: 'Teste de pressão e verificação' },
    ]
  },
  {
    id: 'h002', cat: 'hidraulica', emoji: '🔧',
    title: 'Instalando caixa d\'água de 1000 litros — guia completo',
    desc: 'Tudo que você precisa saber para instalar uma caixa d\'água de 1000 litros, desde o dimensionamento da estrutura de suporte até a instalação da boia e das saídas de água.',
    author: 'Hidro Pro', authorInitials: 'HP',
    views: '87 mil', date: 'há 1 semana', duration: '32:17',
    thumb: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800',
    videoFile: 'videos/instalacao_caixa_dagua.mp4',
    difficulty: 'intermediario', likes: 2870,
    tags: ['caixa dagua', 'instalação', 'boia', 'suporte'],
    timeline: [
      { time: '0:00', text: 'Planejamento e materiais' },
      { time: '5:00', text: 'Construção do suporte' },
      { time: '14:30', text: 'Posicionamento da caixa' },
      { time: '20:00', text: 'Instalação da boia e saídas' },
      { time: '28:10', text: 'Conexão com a rede doméstica' },
    ]
  },
  {
    id: 'h003', cat: 'hidraulica', emoji: '🔧',
    title: 'Desentupindo ralo de pia com equipamento profissional',
    desc: 'Guia técnico detalhado sobre a utilização de sondas rotativas e espirais mecânicos para desobstrução de redes de esgoto doméstico. Analisamos a anatomia da obstrução, a escolha do diâmetro da ponteira e técnicas de avanço/recuo para preservar a integridade das tubulações de PVC sem o uso de reagentes químicos corrosivos.',
    author: 'Desentupidora São Paulo', authorInitials: 'DS',
    views: '242 mil', date: 'há 1 semana', duration: '14:25',
    thumb: 'https://www.sostubo.com.br/upload/blog/SucZmt0akdcwczmuRBLITwkIOtpGAU1BQJrBsaop.jpeg',
    videoFile: 'videos/desentupimento_pia.mp4',
    difficulty: 'intermediario', likes: 8200,
    tags: ['manutenção', 'hidráulica', 'esgoto', 'ferramentas', 'sifonagem'],
    timeline: [
      { time: '0:00', text: 'Diagnóstico: identificando o ponto de obstrução' },
      { time: '3:15', text: 'Seleção da ponteira e montagem do espiral' },
      { time: '7:45', text: 'Técnica de inserção rotativa controlada' },
      { time: '11:20', text: 'Teste de fluxo e higienização pós-serviço' },
    ]
  },
  {
    id: 'h004', cat: 'hidraulica', emoji: '🔧',
    title: 'Instalação de chuveiro elétrico — passo a passo seguro',
    desc: 'Veja como instalar um chuveiro elétrico com segurança, dimensionando corretamente o fio, disjuntor e tomada.',
    author: 'Carlos Encanamentos', authorInitials: 'CE',
    views: '340 mil', date: 'há 1 mês', duration: '22:55',
    thumb: 'https://images.unsplash.com/photo-1620626011761-9963d7b6976a?q=80&w=800',
    videoFile: 'videos/instalacao_chuveiro.mp4',
    difficulty: 'intermediario', likes: 9800,
    tags: ['chuveiro', 'instalação', 'elétrico', 'disjuntor'],
    timeline: [
      { time: '0:00', text: 'Materiais e normas de segurança' },
      { time: '4:10', text: 'Dimensionamento do fio' },
      { time: '9:30', text: 'Instalação do disjuntor dedicado' },
      { time: '15:00', text: 'Fixação e conexão do chuveiro' },
      { time: '20:30', text: 'Teste e ajuste de temperatura' },
    ]
  },
  {
    id: 'h005', cat: 'hidraulica', emoji: '🔧',
    title: 'Como vedar infiltração em parede de banheiro',
    desc: 'Técnicas profissionais para identificar e vedar infiltrações em paredes e pisos de banheiro sem precisar quebrar o azulejo.',
    author: 'Hidro Pro', authorInitials: 'HP',
    views: '92 mil', date: 'há 3 semanas', duration: '26:40',
    thumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    videoFile: 'videos/vedar_infiltracao.mp4',
    difficulty: 'avancado', likes: 3200,
    tags: ['infiltração', 'vedação', 'banheiro', 'impermeabilização'],
    timeline: [
      { time: '0:00', text: 'Identificando a origem da infiltração' },
      { time: '6:20', text: 'Produtos impermeabilizantes' },
      { time: '12:00', text: 'Aplicação sem quebrar azulejo' },
      { time: '20:10', text: 'Retoque e acabamento' },
    ]
  },
  {
    id: 'h006', cat: 'hidraulica', emoji: '🔧',
    title: 'Manutenção de bomba d\'água residencial',
    desc: 'Aprenda a fazer a manutenção preventiva da sua bomba d\'água: limpeza do filtro, verificação de pressão e substituição do capacitor.',
    author: 'Elétrica & Hidráulica SP', authorInitials: 'EH',
    views: '54 mil', date: 'há 2 meses', duration: '19:33',
    thumb: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
    videoFile: 'videos/manutencao_bomba.mp4',
    difficulty: 'avancado', likes: 1870,
    tags: ['bomba dagua', 'manutenção', 'capacitor', 'pressão'],
    timeline: [
      { time: '0:00', text: 'Tipos de bomba residencial' },
      { time: '4:00', text: 'Limpeza do filtro de entrada' },
      { time: '9:30', text: 'Verificação e ajuste de pressão' },
      { time: '14:20', text: 'Substituição do capacitor' },
    ]
  },
  {
    id: 'h007', cat: 'hidraulica', emoji: '🔧',
    title: 'Limpeza de caixa de gordura — guia prático',
    desc: 'Como realizar a manutenção e limpeza da caixa de gordura de forma eficiente, evitando entupimentos na rede de esgoto.',
    author: 'Carlos Encanamentos', authorInitials: 'CE',
    views: '12 mil', date: 'há 1 dia', duration: '15:10',
    thumb: 'https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=800',
    videoFile: 'videos/limpeza_caixa_gordura.mp4',
    difficulty: 'iniciante', likes: 850,
    tags: ['limpeza', 'esgoto', 'manutenção'],
    timeline: [
      { time: '0:00', text: 'Materiais de proteção' },
      { time: '3:20', text: 'Abrindo a tampa' },
      { time: '6:45', text: 'Remoção dos resíduos' },
      { time: '12:10', text: 'Fechamento e higienização' },
    ]
  },

  // ── ELÉTRICA ──
  {
    id: 'e001', cat: 'eletrica', emoji: '⚡',
    title: 'Como instalar tomada 20A com segurança — passo a passo',
    desc: 'Aprenda a instalar uma tomada de 20 ampères para ar-condicionado ou eletrodomésticos pesados. Vamos cobrir o dimensionamento do fio, escolha do disjuntor, e a instalação correta com aterramento.',
    author: 'Eletro Expert', authorInitials: 'EE',
    views: '450 mil', date: 'há 5 dias', duration: '24:10',
    thumb: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800',
    videoFile: 'videos/tomada.mp4',
    difficulty: 'intermediario', likes: 12400,
    tags: ['tomada 20A', 'elétrica', 'ar condicionado', 'aterramento', 'disjuntor'],
    timeline: [
      { time: '0:00', text: 'Normas NBR 5410 — o básico' },
      { time: '3:20', text: 'Ferramentas e EPI necessários' },
      { time: '6:45', text: 'Dimensionamento do fio' },
      { time: '10:30', text: 'Passagem do cabo pela parede' },
      { time: '16:10', text: 'Instalação da tomada com aterramento' },
      { time: '21:00', text: 'Ligação no quadro elétrico' },
    ]
  },
  {
    id: 'e002', cat: 'eletrica', emoji: '⚡',
    title: 'Instalação de fita LED — técnica profissional',
    desc: 'Monte sua iluminação de sancas e móveis com fita LED de forma profissional: escolha da fonte, perfilado de alumínio, perfil difusor e programação de controlador RGB.',
    author: 'Lumina Elétrica', authorInitials: 'LE',
    views: '310 mil', date: 'há 2 semanas', duration: '35:22',
    thumb: 'https://images.unsplash.com/photo-1558002038-1037906d8594?q=80&w=800',
    videoFile: 'videos/fita_led.mp4',
    difficulty: 'iniciante', likes: 8700,
    tags: ['fita LED', 'iluminação', 'RGB', 'sanca', 'fonte'],
    timeline: [
      { time: '0:00', text: 'Escolhendo o tipo de fita LED' },
      { time: '5:30', text: 'Calculando a fonte de alimentação' },
      { time: '11:00', text: 'Instalando o perfil de alumínio' },
      { time: '18:40', text: 'Conectando e soldando a fita' },
      { time: '26:00', text: 'Configurando o controlador RGB' },
    ]
  },
  {
    id: 'e003', cat: 'eletrica', emoji: '⚡',
    title: 'Troca de disjuntor no quadro elétrico — com segurança',
    desc: 'Como identificar um disjuntor defeituoso e fazer a troca com total segurança, sem precisar de eletricista.',
    author: 'Eletro Expert', authorInitials: 'EE',
    views: '198 mil', date: 'há 3 semanas', duration: '16:55',
    thumb: 'https://images.unsplash.com/photo-1617333282638-8353ba873fd2?q=80&w=800',
    videoFile: 'videos/troca_disjuntor.mp4',
    difficulty: 'iniciante', likes: 5600,
    tags: ['disjuntor', 'quadro elétrico', 'troca', 'segurança'],
    timeline: [
      { time: '0:00', text: 'Identificando disjuntor defeituoso' },
      { time: '3:10', text: 'Desligando o disjuntor geral' },
      { time: '5:40', text: 'Removendo o disjuntor antigo' },
      { time: '9:20', text: 'Instalando o novo disjuntor' },
      { time: '13:30', text: 'Teste e verificação' },
    ]
  },
  {
    id: 'e004', cat: 'eletrica', emoji: '⚡',
    title: 'Instalação de interruptor three-way (paralelo)',
    desc: 'Acenda e apague uma lâmpada de dois pontos diferentes. Entenda o princípio do three-way e instale corretamente.',
    author: 'Lumina Elétrica', authorInitials: 'LE',
    views: '176 mil', date: 'há 1 mês', duration: '21:08',
    thumb: 'https://images.unsplash.com/photo-1558002038-1037906d8594?q=80&w=800',
    videoFile: 'videos/interruptor_threeway.mp4',
    difficulty: 'intermediario', likes: 4300,
    tags: ['three-way', 'interruptor', 'paralelo', 'instalação'],
    timeline: [
      { time: '0:00', text: 'Princípio do circuito paralelo' },
      { time: '4:30', text: 'Materiais necessários' },
      { time: '8:00', text: 'Passagem dos fios' },
      { time: '13:20', text: 'Ligação dos interruptores' },
      { time: '18:00', text: 'Teste do circuito' },
    ]
  },
  {
    id: 'e005', cat: 'eletrica', emoji: '⚡',
    title: 'Nobreak e estabilizador — como escolher e instalar',
    desc: 'Guia completo para proteger seus equipamentos eletrônicos com nobreak e estabilizador: diferenças, capacidades e instalação.',
    author: 'TechEletro', authorInitials: 'TE',
    views: '88 mil', date: 'há 5 semanas', duration: '28:44',
    thumb: 'https://images.unsplash.com/photo-1580584126747-4225202404bb?q=80&w=800',
    videoFile: 'videos/nobreak_estabilizador.mp4',
    difficulty: 'iniciante', likes: 2900,
    tags: ['nobreak', 'estabilizador', 'proteção', 'bateria'],
    timeline: [
      { time: '0:00', text: 'Diferença entre nobreak e estabilizador' },
      { time: '6:00', text: 'Calculando a potência necessária' },
      { time: '14:00', text: 'Instalação e configuração' },
      { time: '22:30', text: 'Manutenção das baterias' },
    ]
  },
  {
    id: 'e006', cat: 'eletrica', emoji: '⚡',
    title: 'Instalação de painel solar residencial — visão geral',
    desc: 'Entenda o processo completo de instalação de painéis solares fotovoltaicos na sua residência, do dimensionamento à homologação.',
    author: 'Solar Brasil', authorInitials: 'SB',
    views: '420 mil', date: 'há 2 meses', duration: '48:12',
    thumb: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800',
    videoFile: 'videos/painel_solar.mp4',
    difficulty: 'avancado', likes: 18700,
    tags: ['energia solar', 'fotovoltaico', 'inversor', 'economia'],
    timeline: [
      { time: '0:00', text: 'Como funciona o sistema fotovoltaico' },
      { time: '8:30', text: 'Dimensionamento correto' },
      { time: '18:00', text: 'Fixação dos painéis no telhado' },
      { time: '28:00', text: 'Instalação do inversor' },
      { time: '38:00', text: 'Homologação com a concessionária' },
    ]
  },
  {
    id: 'e007', cat: 'eletrica', emoji: '⚡',
    title: 'Troca de resistência de chuveiro lorenzetti',
    desc: 'O chuveiro parou de esquentar? Aprenda a trocar a resistência de forma rápida e segura.',
    author: 'Eletro Expert', authorInitials: 'EE',
    views: '45 mil', date: 'há 4 dias', duration: '08:45',
    thumb: 'https://images.unsplash.com/photo-1585338107529-13afc5f0141f?q=80&w=800',
    videoFile: 'videos/troca_resistencia.mp4',
    difficulty: 'iniciante', likes: 3200,
    tags: ['chuveiro', 'resistência', 'manutenção'],
    timeline: [
      { time: '0:00', text: 'Segurança e desligamento' },
      { time: '2:00', text: 'Abrindo o chuveiro' },
      { time: '4:30', text: 'Trocando a resistência' },
      { time: '7:00', text: 'Fechamento e teste' },
    ]
  },

  // ── MARCENARIA ──
  {
    id: 'm001', cat: 'marcenaria', emoji: '🪵',
    title: 'Construindo uma prateleira flutuante robusta do zero',
    desc: 'Neste vídeo construímos uma prateleira flutuante resistente com madeira maciça, bucha metálica e acabamento em verniz PU. Ideal para salas e quartos com cargas até 40kg.',
    author: 'Marceneiro Paulo', authorInitials: 'MP',
    views: '94 mil', date: 'há 4 dias', duration: '28:35',
    thumb: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=800',
    videoFile: 'videos/prateleira.mp4',
    difficulty: 'iniciante', likes: 3400,
    tags: ['prateleira', 'madeira', 'verniz', 'parafuso', 'flutuante'],
    timeline: [
      { time: '0:00', text: 'Materiais: tipos de madeira' },
      { time: '4:20', text: 'Corte e lixamento' },
      { time: '10:00', text: 'Marcação e furação na parede' },
      { time: '16:30', text: 'Instalação das buchas metálicas' },
      { time: '21:10', text: 'Acabamento em verniz PU' },
    ]
  },
  {
    id: 'm002', cat: 'marcenaria', emoji: '🪵',
    title: 'Encaixe meia madeira — técnica fundamental para marceneiros',
    desc: 'Aprenda o encaixe meia madeira, um dos mais utilizados na marcenaria para unir peças de forma resistente sem cola nem parafusos visíveis.',
    author: 'Oficina do Mestre', authorInitials: 'OM',
    views: '67 mil', date: 'há 1 semana', duration: '22:17',
    thumb: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800',
    videoFile: 'videos/meia_madeira.mp4',
    difficulty: 'intermediario', likes: 2100,
    tags: ['encaixe', 'meia madeira', 'marcenaria', 'técnica'],
    timeline: [
      { time: '0:00', text: 'Aplicações do encaixe meia madeira' },
      { time: '3:30', text: 'Marcação precisa' },
      { time: '8:00', text: 'Serrando e formando' },
      { time: '14:30', text: 'Ajuste fino com formão' },
      { time: '18:00', text: 'Colagem e prensagem' },
    ]
  },
  {
    id: 'm003', cat: 'marcenaria', emoji: '🪵',
    title: 'Como usar a tupia de bancada — guia completo para iniciantes',
    desc: 'Aprenda a usar a tupia de bancada com segurança: ajuste de altura, escolha de fresas, gabaritos e usinagem de peças com acabamento profissional.',
    author: 'Marceneiro Paulo', authorInitials: 'MP',
    views: '112 mil', date: 'há 2 semanas', duration: '41:28',
    thumb: 'https://images.unsplash.com/photo-1622322062602-0e86b02a246d?q=80&w=800',
    videoFile: 'videos/tupia_bancada.mp4',
    difficulty: 'intermediario', likes: 5800,
    tags: ['tupia', 'fresa', 'madeira', 'usinagem', 'marcenaria'],
    timeline: [
      { time: '0:00', text: 'Apresentando a tupia de bancada' },
      { time: '6:00', text: 'Tipos de fresas e suas aplicações' },
      { time: '14:00', text: 'Ajuste de profundidade e altura' },
      { time: '22:30', text: 'Usinando molduras e raios' },
      { time: '34:00', text: 'Limpeza e manutenção da máquina' },
    ]
  },
  {
    id: 'm004', cat: 'marcenaria', emoji: '🪵',
    title: 'Aplicação de stain e verniz — acabamento perfeito',
    desc: 'Técnica completa de acabamento em madeira usando stain colorido e verniz poliuretano: lixamento progressivo, aplicação em camadas e polimento final.',
    author: 'Oficina do Mestre', authorInitials: 'OM',
    views: '78 mil', date: 'há 3 semanas', duration: '19:44',
    thumb: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800',
    videoFile: 'videos/stain_verniz.mp4',
    difficulty: 'iniciante', likes: 2700,
    tags: ['verniz', 'stain', 'acabamento', 'lixamento', 'madeira'],
    timeline: [
      { time: '0:00', text: 'Lixamento progressivo 80-220' },
      { time: '5:00', text: 'Aplicação do stain' },
      { time: '9:30', text: 'Lixamento intermediário' },
      { time: '13:00', text: 'Camadas de verniz PU' },
      { time: '17:00', text: 'Polimento final' },
    ]
  },
  {
    id: 'm005', cat: 'marcenaria', emoji: '🪵',
    title: 'Construindo uma mesa de centro com tampo ripado',
    desc: 'Projeto completo de uma mesa de centro moderna com tampo ripado em pinus e estrutura em metal: cortes, montagem, solda e acabamento.',
    author: 'Arte em Madeira', authorInitials: 'AM',
    views: '156 mil', date: 'há 1 mês', duration: '55:10',
    thumb: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800',
    videoFile: 'videos/mesa_centro.mp4',
    difficulty: 'avancado', likes: 7200,
    tags: ['mesa', 'ripado', 'pinus', 'metal', 'projeto'],
    timeline: [
      { time: '0:00', text: 'Projeto e lista de materiais' },
      { time: '8:00', text: 'Corte das ripas em pinus' },
      { time: '18:00', text: 'Estrutura metálica — solda MIG' },
      { time: '32:00', text: 'Fixação do tampo na estrutura' },
      { time: '44:00', text: 'Acabamento e aplicação de óleo' },
    ]
  },
  {
    id: 'm006', cat: 'marcenaria', emoji: '🪵',
    title: 'Afiar formões e plainas com pedra de amolar',
    desc: 'Aprenda a afiar formões e plainas de mão usando pedras de amolar com diferentes granulometrias para obter um fio perfeito.',
    author: 'Marceneiro Paulo', authorInitials: 'MP',
    views: '43 mil', date: 'há 6 semanas', duration: '17:22',
    thumb: 'https://images.unsplash.com/photo-1504198458649-012800363a50?q=80&w=800',
    videoFile: 'videos/afiar_formao.mp4',
    difficulty: 'iniciante', likes: 1500,
    tags: ['formão', 'plaina', 'afiar', 'pedra de amolar'],
    timeline: [
      { time: '0:00', text: 'Por que afiar é essencial' },
      { time: '2:30', text: 'Tipos de pedra de amolar' },
      { time: '6:00', text: 'Técnica de afiação correta' },
      { time: '12:00', text: 'Acabamento no couro' },
    ]
  },
  {
    id: 'm007', cat: 'marcenaria', emoji: '🪵',
    title: 'Construindo um banco de jardim rústico',
    desc: 'Aprenda a fazer um banco de jardim utilizando sobras de madeira e técnicas simples de marcenaria rústica.',
    author: 'Oficina do Mestre', authorInitials: 'OM',
    views: '28 mil', date: 'há 2 dias', duration: '22:40',
    thumb: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800',
    videoFile: 'videos/banco_jardim.mp4',
    difficulty: 'iniciante', likes: 1900,
    tags: ['banco', 'jardim', 'rústico', 'projeto'],
    timeline: [
      { time: '0:00', text: 'Projeto e medidas' },
      { time: '5:00', text: 'Cortes brutos' },
      { time: '12:00', text: 'Montagem estrutural' },
      { time: '18:00', text: 'Lixamento e proteção' },
    ]
  },
];

// Category metadata
const CATEGORIES = {
  hidraulica: {
    label: 'Hidráulica',
    icon: '🔧',
    emoji: '🔧',
    desc: 'Aprenda encanamento, registros, caixas d\'água, bombas e sistemas de distribuição de água em casa ou na obra.',
    bg: '#0c1a24',
    accentClass: 'chip-hidraulica',
    bodyClass: 'cat-hidraulica'
  },
  eletrica: {
    label: 'Elétrica',
    icon: '⚡',
    emoji: '⚡',
    desc: 'Instalações elétricas residenciais, disjuntores, tomadas, iluminação LED, painéis solares e muito mais.',
    bg: '#1a1200',
    accentClass: 'chip-eletrica',
    bodyClass: 'cat-eletrica'
  },
  marcenaria: {
    label: 'Marcenaria',
    icon: '🪵',
    emoji: '🪵',
    desc: 'Cortes, encaixes, acabamentos com verniz e construção de móveis planejados com técnica e segurança.',
    bg: '#1a1408',
    accentClass: 'chip-marcenaria',
    bodyClass: 'cat-marcenaria'
  }
};

// Helpers
function getVideosByCategory(cat) {
  if (cat === 'todos') return VIDEOS;
  return VIDEOS.filter(v => v.cat === cat);
}
function getVideoById(id) {
  return VIDEOS.find(v => v.id === id) || null;
}
function searchVideos(query) {
  const q = query.toLowerCase();
  return VIDEOS.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.desc.toLowerCase().includes(q) ||
    v.tags.some(t => t.toLowerCase().includes(q)) ||
    CATEGORIES[v.cat]?.label.toLowerCase().includes(q)
  );
}
function formatViews(str) { return str; }
function diffLabel(d) {
  return { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' }[d] || d;
}