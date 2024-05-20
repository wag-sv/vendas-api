# VENDAS-API

### Documentação da API

Esta documentação fornece um guia passo-a-passo para testar a API. 

A API e o banco de dados estão configurados para rodar via Docker, facilitando a configuração e evitando a necessidade de instalações e configurações adicionais na máquina do avaliador.

#### Pré-requisitos
- Docker
- Docker Compose
- As portas 3000 e 5433 devem estar disponíveis no seu computador para que os containers possam ser executados sem conflitos.

### Passo 1: Executar o Docker Compose

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. No diretório raiz do projeto, execute o seguinte comando para iniciar os contêineres da API e do banco de dados:

```bash
docker-compose up
```

### Passo 2: Acessar Apollo Server

As requisições à API serão feitas via GraphQL e podem ser realizadas utilizando o Apollo Server através do navegador. Acesse:

```bash
http://localhost:3000/graphql
```

### Passo 3: Criar um Usuário

A primeira etapa é criar um usuário. Esta rota está aberta e pode ser acessada sem autenticação. Abaixo está um exemplo de requisição GraphQL para criar um usuário:

#### Exemplo de Requisição - Criar Usuário

```graphql
mutation {
  createUser(createUserInput: {
    name: "Usuário Teste",
    email: "usuario.teste@email.com"
    password: "123456",
  }) {
    id
    name
    email
  }
}
```

### Passo 4: Autenticar na API

Após criar o usuário, você precisará autenticar para obter um token JWT que permitirá acessar as rotas protegidas.

#### Exemplo de Requisição - Autenticar

```graphql
mutation {
  login(loginInput: {
    email: "usuario.teste@email.com",
    password: "123456"
  }) {
    user{
      id
      name
      email
    }
    token
  }
}
```

### Passo 5: Cadastrar Clientes

Com o token JWT obtido na autenticação, você pode agora cadastrar um cliente.

#### Exemplo de Requisição - Criar Cliente

```graphql
mutation {
  createCustomer(createCustomertInput: {
    name: "Cliente Teste",
    cpf: "123.456.789-00",
    email: "cliente.teste@email.com"
  }) {
    id
    name
    cpf
    email
  }
}
```

### Passo 6: Cadastrar Produtos

A API suporta quatro tipos de produtos. Abaixo estão exemplos de requisições para criar cada tipo de produto.

#### Exemplo de Requisição - Criar Produto Simples

```graphql
mutation {
  createProduct(createProductInput: {
    name: "Produto Simples",
    description: "Descrição do produto simples",
    price: 100.0,
    stock: 50
  }) {
    id
    name
    description
    price
    stock
  }
}
```

#### Exemplo de Requisição - Criar Produto Digital

```graphql
mutation {
  createDigitalProduct(createDigitalProductInput: {
    name: "Produto Digital",
    description: "Descrição do produto digital",
    price: 150.0,
    stock: 100,
    downloadLink: "http://example.com/download"
  }) {
    id
    name
    description
    price
    stock
    downloadLink
  }
}
```

#### Exemplo de Requisição - Criar Produto Configurável

```graphql
mutation {
  createConfigurableProduct(createConfigurableProductInput: {
    name: "Produto Configurável",
    description: "Descrição do produto configurável",
    price: 200.0,
    stock: 30,
    color: "Azul",
    size: "M"
  }) {
    id
    name
    description
    price
    stock
    color
    size
  }
}
```

#### Exemplo de Requisição - Criar Produto Agrupado

```graphql
mutation {
  createGroupedProduct(createGroupedProductInput: {
    name: "Produto Agrupado",
    description: "Descrição do produto agrupado",
    price: 300.0,
    stock: 20,
    associatedProducts: ["<ID do Produto 1>", "<ID do Produto 2>"]
  }) {
    id
    name
    description
    price
    stock
    associatedProducts {
      id
      name
    }
  }
}
```

### Passo 7: Listar Produtos e Clientes

Após criar os produtos e clientes, você pode listá-los.

#### Exemplo de Requisição - Listar Produtos

```graphql
query {
  getProducts {
    id
    name
    description
    price
    stock
    type
  }
}
```

#### Exemplo de Requisição - Listar Clientes

```graphql
query {
  getClients {
    id
    name
    cpf
    email
  }
}
```

### Passo 8: Criar uma Venda

Utilize os IDs dos produtos e do cliente criados para registrar uma venda.

#### Exemplo de Requisição - Criar Venda

```graphql
mutation {
  createSale(createSaleInput: {
    description: "Venda de exemplo",
    totalValue: 500.0,
    date: "2024-05-20",
    clientId: "<ID do Cliente>",
    saleProducts: [
      { productId: "<ID do Produto 1>", quantity: 2 },
      { productId: "<ID do Produto 2>", quantity: 3 }
    ]
  }) {
    id
    description
    totalValue
    date
    client {
      id
      name
    }
    saleProducts {
      product {
        id
        name
      }
      quantity
      unitPrice
      totalPrice
    }
  }
}
```

### Passo 9: Listar Vendas

Após criar uma venda, você pode listá-las.

#### Exemplo de Requisição - Listar Vendas

```graphql
query {
  getSales {
    id
    description
    totalValue
    date
    client {
      id
      name
    }
    saleProducts {
      product {
        id
        name
      }
      quantity
      unitPrice
      totalPrice
    }
  }
}
```

### Passo 10: Operações CRUD Extras

Além das operações básicas descritas acima, a API suporta todas as operações CRUD para os módulos de usuário, produto, cliente e venda. Abaixo estão exemplos de outras operações que podem ser testadas:

#### Atualizar Produto

```graphql
mutation {
  updateProduct(id: "<ID do Produto>", updateProductInput: {
    name: "Novo Nome do Produto",
    description: "Nova descrição",
    price: 120.0,
    stock: 40
  }) {
    id
    name
    description
    price
    stock
  }
}
```

#### Deletar Produto

```graphql
mutation {
  removeProduct(id: "<ID do Produto>") {
    success
  }
}
```

#### Atualizar Cliente

```graphql
mutation {
  updateClient(id: "<ID do Cliente>", updateClientInput: {
    name: "Novo Nome do Cliente",
    email: "novoemail@example.com"
  }) {
    id
    name
    cpf
    email
  }
}
```

#### Deletar Cliente

```graphql
mutation {
  removeClient(id: "<ID do Cliente>") {
    success
  }
}
```

#### Atualizar Venda

```graphql
mutation {
  updateSale(id: "<ID da Venda>", updateSaleInput: {
    description: "Nova descrição da venda",
    totalValue: 600.0,
    saleProducts: [
      { productId: "<ID do Produto 1>", quantity: 1 },
      { productId: "<ID do Produto 2>", quantity: 4 }
    ]
  }) {
    id
    description
    totalValue
    date
    client {
      id
      name
    }
    saleProducts {
      product {
        id
        name
      }
      quantity
      unitPrice
      totalPrice
    }
  }
}
```

#### Deletar Venda

```graphql
mutation {
  removeSale(id: "<ID da Venda>") {
    success
  }
}
```

### Conclusão

Este guia cobre o fluxo básico de utilização da API, desde a configuração inicial até a execução de operações CRUD completas. Utilize os exemplos de requisições GraphQL fornecidos para testar as funcionalidades principais e adicionais da API. Se houver alguma dúvida ou necessidade de informação adicional, sinta-se à vontade para perguntar.