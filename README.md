# Hono Bun

Hono bund....

## To install dependencies:

```bash
npm install -g bun
bun install
```

## To run:

Rename, init, run

```bash
mv ./.env_copy ./.envs
bun run ./src/config/init.ts
bun run ./src/app.ts
```

## To develop:

```bash
bun run --hot ./src/app.ts
```

## Endpoint

```
GET localhost:3000/product
GET localhost:3000/product/:id
POST localhost:3000/product/
PUT localhost:3000/product/:id
DELETE localhost:3000/product/:id
```

fariswd  
2024  
🤰
