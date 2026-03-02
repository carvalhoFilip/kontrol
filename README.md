# kontrol. — TC-11 DROP

Loja online minimalista para o drop TC-11 da marca KONTROL (training club).

## Setup

```bash
npm install
```

Coloque as imagens dos produtos em `public/images/`:

- **icarus-tank.png** — Regata machão ICARUS
- **dryfit-tee.png** — Camiseta dryfit TC-11

## Desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estrutura

- **Home** = vitrine do drop (TC-11 DROP) com os dois produtos
- **Produto** — `/produto/icarus-training-tank` e `/produto/tc-11-dryfit-tee`
- **Checkout** — `/checkout` (carrinho; pagamento pode ser integrado depois)

Carrinho persiste em `localStorage`.
