# App

Manual App

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível criar uma nova categoria;
- [x] Deve ser possível criar uma nova série;
- [x] Deve ser possível criar um novo produto;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder criar uma categoria com o nome duplicado;
- [x] O usuário não deve poder criar uma série com o nome duplicado;
- [x] O usuário não deve poder criar uma série com um id de categoria inexistente;
- [x] O usuário não deve poder criar um produto com o nome duplicado;
- [x] O usuário não deve poder criar um produto com um id da série inexistente;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);