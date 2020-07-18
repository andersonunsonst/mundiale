# desafio mundiale

Desenvolver um crawler (coletor) capaz de buscar uma lista de produtos no Mercado Livre.

# Dependências

- Cheerio: Para utilizar seletores jQuery e fazer a navegação dos elementos retornados no body;
- Express: Utilizado para criar as rotas e receber as requisições http;
- FS: Para criação de arquivos temporários para facilitar a iteração dos objetos;
- Axios: Para buscar o body das páginas
- winston: Pata geração de logs

# Rodando a aplicação

 executar o comando _yarn install_ dentro da pasta da aplicação e depois um _yarn dev_ para incializar 

# Rotas

A aplicação possui duas rotas acessíveis: _/_ e _/search_

## /
- Método: GET;
- Função: Testar a aplicação;
- Chamada: -
- Retorno: jSON.

## /search
- Método: POST;
- Função: retornar os anúncios saneados do mercado livre saneados;
- Chamada: _{_
                _"search": "string",_
                _"limit": int_
           _}_
- Retorno: jSON.

