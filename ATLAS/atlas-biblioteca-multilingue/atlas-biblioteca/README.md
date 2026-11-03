# ATLAS — Biblioteca Intelectual

Aplicação de biblioteca pessoal desenvolvida com **React, JavaScript, HTML e CSS**.

## Funcionalidades

- 30 livros iniciais distribuídos em 10 áreas do conhecimento.
- Cadastro controlado de livros (título, autor, categoria, status e observação).
- Renderização dinâmica com `.map()` e `key`.
- Atualização de status com um clique: Quero ler → Lendo → Concluído.
- Exclusão com `.filter()` (com confirmação).
- Busca por título, autor ou área.
- Filtros por categoria e status.
- Estatísticas e barra de progresso.
- Persistência no navegador com `localStorage`.\n- Interface multilíngue: português, inglês, espanhol, francês e alemão.\n- Seletor de idioma no cabeçalho; preferência salva automaticamente no navegador.
- Layout responsivo para desktop e celular.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- React 18
- Vite
- Lucide React (ícones)

## Como executar

É necessário ter Node.js instalado.

```bash
npm install
npm run dev
```

Abra no navegador o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Como publicar no GitHub

1. Crie um repositório vazio no GitHub com o nome `atlas-biblioteca-intelectual`.
2. Descompacte este projeto e abra a pasta no VS Code.
3. No terminal, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "feat: cria biblioteca intelectual ATLAS"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/atlas-biblioteca-intelectual.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário do GitHub.

## Requisitos da atividade atendidos

| Requisito | Onde está |
|---|---|
| Formulário controlado | `src/App.jsx` — estados `form`, `updateField` e `addBook` |
| Listagem com `.map()` e `key` | `filteredBooks.map(...)` na grade de livros |
| Alterar status | `cycleStatus()` e botão de status em `BookCard` |
| Excluir com `.filter()` | `deleteBook()` |
| CSS e organização visual | `src/styles.css` |

## Observação

Os dados ficam salvos no `localStorage` do navegador. Isso significa que a biblioteca continua preenchida no mesmo navegador e dispositivo, mas não sincroniza automaticamente entre dispositivos ou usuários.
