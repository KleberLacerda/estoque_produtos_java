# Sistema de Gestão de Produtos & Estoque (Full-Stack)

> Aplicação web completa para gerenciamento de catálogo de produtos e controle de inventário. O projeto integra uma **API RESTful em Java/Spring Boot** a uma **interface dinâmica e acessível em Vanilla JS**.

Esse projeto foi desenvoldo do zero no curso de Java, foi um grande aprendizado vendo na pratica como tudo funciona por debaixo dos panos. Entre os principais aprendizados e desafios superados, destaco:

1 - Visão End-to-End de uma Aplicação: Conectar o Front-end ao Back-end me deu a real noção de como os dados fluem desde um clique na tela até a persistência no banco SQLite.

2 - Domínio da Comunicação HTTP: Aprendi na prática como lidar com verbos HTTP (GET, POST, PUT, DELETE), tratamento de headers, consumo de JSONs via async/await e resolução de conflitos de CORS.

3 - Consolidação das Bases do JavaScript: Optei por usar Vanilla JS exatamente para entender como o DOM funciona por baixo dos panos antes de migrar para frameworks como React.

4 - Organização em Monorepo: Estruturar o projeto mantendo a separação clara de responsabilidades entre as pastas backend e frontend me ajudou a entender como funciona o fluxo de trabalho em equipes reais.




## Arquitetura do Projeto 

``
meu-projeto-springboot/
├── backend/            # API RESTful (Java / Spring Boot + Spring Data JPA + SQLite)
│   ├── src/
│   └── pom.xml
└── frontend/           # Client SPA (HTML5 + CSS3 + JS)
    └── dist/
        ├── css/
        ├── js/
        └── index.html


## Funcionalidades Principais
<ul>
Operações CRUD Completas: Cadastro, listagem, atualização e remoção de produtos em tempo real.
Busca Textual: Pesquisa aproximada por nome de produto.
Segurança no Front-end: Sanitização dinâmica dos dados injetados no DOM contra ataques de XSS.
Integração Assíncrona: Comunicação fluida via Fetch API (async/await) com tratamento de erros.
Interface Acessível: Layout responsivo (Flexbox/Grid), anotações WAI-ARIA para leitores de tela e indicativos de status.
</ul>


## HardSkill
<ul>
Back-end & Banco de Dados
Java 22 & Spring Boot 3: Construção da API RESTful, controle de rotas e regra de negócio.
Spring Data JPA / Hibernate: Mapeamento objeto-relacional (ORM) e abstração das consultas ao banco.
SQLite: Banco de dados relacional leve e prático para o ambiente de desenvolvimento.
IntelliJ IDEA: IDE principal utilizada para o desenvolvimento e depuração do ecossistema Java.
</ul>

Front-end & Ferramental Web
<ul>
HTML5 & CSS3: Estruturação semântica e estilização responsiva.
JavaScript (ES6+ Vanilla): Manipulação do DOM pura, sem a necessidade de frameworks pesados no client-side.
VS Code & Live Server: Editor de código e servidor local para desenvolvimento ágil da interface.
Git & GitHub: Controle de versão e organização do ecossistema em formato Monorepo.
</ul>



