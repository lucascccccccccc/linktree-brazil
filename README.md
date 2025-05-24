# Linktree Brazil 🌳

Um clone do Linktree com funcionalidades específicas para o mercado brasileiro, construído com tecnologias modernas.

## 🚀 Tecnologias Utilizadas

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Bun

### Backend
- Node.js
- TypeScript
- Prisma
- Bun

## 📸 Screenshots

![Homepage](./screenshots/homepage.png)
*Página inicial do Linktree Brazil*

![Dashboard](./screenshots/dashboard.png)
*Dashboard do usuário*

![Links Management](./screenshots/links-management.png)
*Gerenciamento de links*

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js
- Bun
- PostgreSQL

### Backend

```bash
cd backend
bun install
# Configure o arquivo .env com suas variáveis de ambiente
bun prisma generate
bun prisma migrate dev
bun dev
```

### Frontend

```bash
cd frontend
bun install
bun dev
```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:3001`.

## 🌟 Funcionalidades

- ✨ Interface moderna e responsiva
- 🔒 Autenticação segura
- 📱 Personalização completa do perfil
- 📊 Analytics de cliques
- 🎨 Temas personalizáveis
- 📱 Totalmente responsivo

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

Para sugestões, dúvidas ou contribuições, por favor abra uma issue no repositório.

---

⭐️ Se este projeto te ajudou, considere dar uma estrela no GitHub!