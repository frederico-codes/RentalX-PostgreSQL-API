# RentalX In-Memory API

API REST de apoio a um sistema de aluguel de veículos. O projeto está em estágio inicial e disponibiliza operações para categorias e especificações de veículos, além da importação de categorias por arquivo CSV.

## Tecnologias

- Node.js e TypeScript
- Express
- Multer para receber arquivos
- `csv-parse` para interpretar arquivos CSV
- Swagger UI para documentação da API

## Requisitos

- Node.js e npm instalados

## Como executar

Na raiz do projeto, instale as dependências e inicie o servidor em modo de desenvolvimento:

```bash
npm install
npm run dev
```

O servidor inicia na porta `3333`:

- API: `http://localhost:3333`
- Documentação Swagger: `http://localhost:3333/api-docs`

O comando `dev` usa `ts-node-dev` para reiniciar o servidor quando os arquivos TypeScript são alterados. O projeto ainda não configura comandos de teste ou de build para produção.

## Endpoints

### Categorias

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/categories` | Cria uma categoria |
| `GET` | `/categories` | Lista as categorias |
| `POST` | `/categories/import` | Recebe um CSV no campo `file` |

#### Criar categoria

```http
POST /categories
Content-Type: application/json
```

```json
{
  "name": "SUV",
  "description": "Veículos utilitários esportivos"
}
```

Uma criação bem-sucedida retorna `201 Created`. O nome da categoria não pode duplicar um já existente.

#### Listar categorias

```http
GET /categories
```

Retorna um array JSON com as categorias disponíveis no processo atual.

#### Importar categorias

Envie uma requisição `multipart/form-data` com o arquivo no campo `file`:

```bash
curl -X POST http://localhost:3333/categories/import \
  -F "file=@categories.csv"
```

O CSV deve conter uma categoria por linha, com nome e descrição separados por vírgula e sem cabeçalho:

```csv
SUV,Veículos utilitários esportivos
Sedan,Veículos de passeio com porta-malas separado
```

Se nenhum arquivo for enviado, a API retorna `400 Bad Request`.

### Especificações

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/specifications` | Rota registrada para criação de especificações |

Exemplo de corpo esperado:

```json
{
  "name": "Câmbio automático",
  "description": "Transmissão automática"
}
```

> **Estado atual:** a criação de especificações ainda não está concluída; o repositório não persiste as especificações recebidas.

## Organização do código

```text
src/
├── modules/
│   └── cars/
│       ├── model/           # Modelos de categoria e especificação
│       ├── repositories/    # Contratos e repositórios
│       ├── services/        # Serviços de domínio
│       └── useCases/        # Casos de uso e controladores
├── routes/                 # Rotas HTTP
├── server.ts               # Inicialização do Express
└── swagger.json            # Especificação OpenAPI usada pelo Swagger UI
```

## Observações

- Os repositórios armazenam dados em memória; categorias são perdidas quando o processo do servidor é encerrado ou reiniciado.
- A importação CSV inicia o processamento sem aguardar sua conclusão antes de responder à requisição. Portanto, a resposta da rota não confirma que todas as categorias foram importadas.
- A documentação OpenAPI disponível no Swagger UI não cobre todas as rotas implementadas.
- O projeto não possui persistência em banco de dados configurada.
