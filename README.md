# Search d_evs - GitHub
O projeto foi desenvolvido utilizando a biblioteca React, com estilização via ChakraUI v2, e está disponível para acesso online através do link abaixo:
[👉 Acesse o Search d_evs](https://seu-link-da-vercel-aqui.vercel.app/)

## 👤 Autor
- Maurício Tavares de Melo
- [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mauricio-tavares-de-melo/)
- [![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=FFF)](https://github.com/MauricioTdM)

## 💻 Tecnologias utilizadas:
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Funcionalidades Implementadas
- Busca de perfis de desenvolvedores na API pública do GitHub.
- Exibição de repositórios públicos com paginação via scroll infinito.
- Opção de ordenação dos repositórios (alfabética, criação ou atualização).
- Internacionalização (i18n) para Português e Inglês.
- Responsividade adaptada para diferentes tamanhos de tela.
- Tratamento de erros e estados vazios para usuários não encontrados ou sem repositórios públicos.

## 🧠 Decisões Técnicas
- **Zod:** Utilizado para modelagem e validação rigorosa dos contratos da API, garantindo a integridade dos dados na interface.
- **Scroll Nativo:** O scroll infinito foi implementado usando a API nativa IntersectionObserver do navegador, evitando bibliotecas pesadas e melhorando a performance geral.
- **Otimização de Renderização:** Separação das chamadas de API em hooks de efeito distintos para evitar requisições de perfil desnecessárias ao trocar o filtro de ordenação da lista.

## 📂 Estrutura do Projeto
- **src/assets**: Ícones e arquivos estáticos.
- **src/components**: Componentes visuais reutilizáveis.
- **src/pages**: Telas principais da aplicação (Home e Profile).
- **src/schemas**: Validações de dados e tipagens com Zod.
- **src/services**: Funções de comunicação e requisição com a API REST do GitHub.
- **src/styles**: Configurações de tema customizado do Chakra UI.

## ⚙️ Como Executar o Projeto Localmente
Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório** na sua máquina.

2. **Instale as dependências**:
Certifique-se de ter o Node.js instalado em sua máquina.
Em seguida, abra o terminal do VSCode no diretório do projeto e execute:
```bash
npm install
```

3. **Variáveis de Ambiente**:
Crie um arquivo `.env` na raiz do projeto e adicione seu token do GitHub para evitar limites de requisição:
```bash
VITE_GITHUB_TOKEN=seu_token_aqui
```

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

5. **Acesse o projeto no navegador**:
O projeto estará disponível em: http://localhost:5173