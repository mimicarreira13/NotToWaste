# **Projeto NotToWaste - Front-End**

## Estrutura do Projeto

Aqui está uma visão geral da estrutura do projeto, destacando as partes mais importantes para entender o funcionamento:

```
NotToWaste/
├── README.md
├── index.html
├── eslint.config.js
├── package.json
├── vite.config.js
├── src/
│   ├── assets/          # Imagens, ícones e outros arquivos estáticos
│   │   └── images/
│   ├── components/      # Componentes reutilizáveis (Navbar, Botões, Cards, etc.)
│   │   └── Navbar.tsx
│   ├── pages/           # Páginas individuais do projeto
│   │   ├── Home.tsx
│   │   ├── OutraPagina.tsx
│   ├── App.tsx          # Componente principal, onde as rotas são definidas
│   └── main.tsx         # Ponto de entrada do React
└── node_modules/        # Dependências do projeto
```

### Descrição das Pastas Principais

* **assets/**: Contém imagens, ícones e outros arquivos estáticos usados no projeto.
* **components/**: Componentes reutilizáveis como Navbar, botões, cards, etc.
* **pages/**: Páginas individuais do site (Home, About, Contact, etc.).
* **App.jsx**: Componente principal que define as rotas do projeto.
* **main.jsx**: Ponto de entrada do React, onde o App é montado.

# Instruções de Inicialização

1. Clonar o repositório:

   ```bash
   git clone git@github.com:mimicarreira13/NotToWaste.git
   ```
2. Instalar dependências:

   ```bash
   npm install
   ```
3. Iniciar a aplicação:

   ```bash
   npm run dev
   ```

   O frontend deve abrir em `http://localhost:5173/` (ou porta configurada).


---

## **Distribuição de Tarefas**

| Grupo | Membro Responsável | Páginas | Observações |
|-------|-----------------|---------|-------------|
| 1 | Milena    | Página Inicial (navbar -> para todas as páginas), Página de Perfis, Página do Cliente | Menu dinâmico, grid de perfis, lógica de login simulada, grid de pratos do cliente, download de relatórios, popups de permissão e feedback. |
| 2 | Alexandra | Página de Stock, Página de Desperdício | Tabelas de ingredientes, popups de adicionar/editar, manipulação de stock/desperdício, botões de incremento/decremento, feedback visual. |
| 3 | Leandro   | Página de Cozinha, Página de Gerir Pratos | Grid de pratos e ingredientes, visualização detalhada, filtros e pesquisa, popups de adicionar/editar/excluir pratos e ingredientes (somente chefe de cozinha), alternar entre grid de pratos e ingredientes. |
| 4 | Catarina  | Dashboard, Definições | Métricas de sustentabilidade, notificações de ingredientes próximos da validade, download de relatórios, configuração de alertas (tipo e número de dias), popups de confirmação e feedback. |

---

## **Descrição Detalhada de Cada Página**

### **1️⃣ Página Inicial**
- Navbar: logo (esquerda), nome da aplicação (centro), pesquisa + ícone do utilizador (direita)
- Menu de opções: Dashboard, Cozinha, Definições, Gerir Pratos, Stock, Desperdício
- Funcionalidades:
  - Mostrar apenas opções desbloqueadas de acordo com o tipo de utilizador
  - Clique em opção bloqueada → popup: “Serviço indisponível / Sem permissão”
  - Navegação para páginas correspondentes
- Tipos de utilizador e permissões:
  - Funcionário de stock: Stock, Desperdício
  - Gerente: Todas
  - Cozinheiro: Cozinha, Desperdício
  - Chefe de cozinha: Dashboard, Cozinha, Gerir Pratos, Desperdício

### **2️⃣ Página de Perfis**
- Grid de perfis: Gerente, Funcionário de Stock, Chefe de Cozinha, Cozinheiro
- Funcionalidades:
  - Seleção de perfil → simula login
  - Guardar perfil selecionado em state global/context

### **3️⃣ Página do Cliente**
- Grid de pratos disponíveis: imagem, nome, ingredientes (opcional)
- Pratos indisponíveis: bloqueados, texto “Não disponível”
- Botões de download de relatórios: sustentabilidade e ingredientes mais desperdiçados
- Funcionalidades:
  - Visualizar apenas pratos disponíveis
  - Download de relatórios
  - Feedback visual em interações (hover, clique)

### **4️⃣ Página de Stock**
- Tabela de ingredientes: nome, quantidade, data de validade, data de abertura, ícones + / -
- Botões: Adicionar, Voltar
- Funcionalidades:
  - Adicionar ingrediente → popup com campos, Cancelar / Adicionar
  - Incrementar quantidade (+)
  - Popup de confirmação após adição
  - Backend decrementa stock automaticamente quando aplicável

### **5️⃣ Página de Desperdício**
- Tabela de desperdício: nome do ingrediente, quantidade, motivo, data, botões + / -
- Botões: Adicionar, Voltar
- Funcionalidades:
  - Adicionar desperdício → popup com campos, Cancelar / Adicionar
  - Popup de confirmação após adição
  - Backend decrementa stock automaticamente

### **6️⃣ Página de Cozinha**
- Barra superior: Voltar, seleção Pratos / Ingredientes, pesquisa
- Grid de pratos: imagem, nome, lista de ingredientes
- Funcionalidades:
  - Alternar visualização entre pratos e ingredientes
  - Pesquisa de pratos/ingredientes
  - Seleção de prato → ingredientes retirados do stock automaticamente (backend)
  - Botão Voltar → página anterior

### **7️⃣ Página de Gerir Pratos**
- Grid de pratos e ingredientes:
  - Pratos: imagem, nome, lista de ingredientes, ícone apagar
  - Ingredientes: nome, custo, peso, validade, ícone editar (somente Chefe de Cozinha)
- Funcionalidades:
  - Adicionar prato → popup: nome, ingredientes, custo, imagem, Cancelar / Adicionar
  - Visualização detalhada do prato: ingredientes, custo, imagem, botões Editar / Eliminar
  - Editar prato / ingrediente → popup com feedback
  - Eliminar prato → popup de confirmação + popup de sucesso/erro
  - Pesquisa e filtro
  - Alternar entre grid de pratos e ingredientes

### **8️⃣ Dashboard**
- Notificações de ingredientes a expirar ≤7 dias (topo da página)
- Métricas: pontuação de sustentabilidade, % de desperdício, valor monetário do desperdício, outras métricas
- Botões de download: relatórios de sustentabilidade, ingredientes mais desperdiçados
- Funcionalidades:
  - Visualização contínua de notificações
  - Download de relatórios
  - Possível cálculo de sustentabilidade: `100 - (Desperdício monetário / Total gasto em compras) * 100`

### **9️⃣ Definições**
- Botão Voltar
- Funcionalidades:
  - Editar alertas:
    - Tipo 1: sugestões de pratos com ingredientes a expirar
    - Tipo 2: alertas de 7 dias para ingredientes próximos da validade
  - Ajuste do número de dias via + / -
  - Cancelar / Guardar alterações

---

## **Observações Gerais**
- Navbar incluída na Página Inicial, visível em todas as páginas
- Popups de feedback para ações críticas (adicionar, editar, eliminar, guardar alterações)
- Popups de confirmação para exclusão de pratos
- Layout consistente: grid, barra superior, botões
- Backend gere decremento de stock, disponibilidade de pratos e cálculo de métricas

