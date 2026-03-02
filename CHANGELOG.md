# Changelog — Loja KONTROL

## V2 — Refinamento Visual Clean (ATUAL)

### Mudança principal: DARK NO HEADER, CLEAN NO CORPO

**Problema resolvido**: Layout pesado demais visualmente. Muito preto contínuo causava cansaço.

**Solução aplicada**: Preto fica no header. Produto respira no corpo do site.

### Estrutura Visual Refinada

#### 1. HEADER (DARK)
- Fundo preto (#000)
- Logo "KONTROL." em branco (1.5rem)
- Subtexto "training club" em cinza médio
- Carrinho no canto superior direito
- Sem bordas, limpo e elegante

#### 2. CORPO (CLEAN)
- Fundo cinza muito claro (#f5f5f5)
- Alta sensação de espaço
- Muito respiro entre seções
- Contraste claro entre produto e fundo

#### 3. PRODUTOS
- Cards invisíveis (sem borda visual pesada)
- Imagens em fundo branco com borda sutil (#e0e0e0)
- Nome do produto em preto (#1a1a1a)
- Preço em cinza escuro (#666)
- Botão "add to cart": fundo preto + texto branco, hover invertido
- Hover com translateY(-4px) para feedback visual

#### 4. FOOTER (DARK)
- Fundo preto (#000)
- Texto em cinza médio (#888, #bbb, #666)
- "KONTROL — training club", @kontroltc, 2025
- Separado do corpo com espaçamento generoso

### Paleta de Cores

```css
--bg-dark: #000         /* Header e Footer */
--bg-light: #f5f5f5     /* Corpo do site */
--text-dark: #1a1a1a    /* Texto principal */
--text-muted: #666      /* Texto secundário */
--text-light: #fff      /* Texto em fundos escuros */
--border-subtle: #e0e0  /* Bordas discretas */
```

### Sensação Final

- ✓ Loja leve e profissional
- ✓ Produto valorizado e em destaque
- ✓ Cliente confortável para comprar
- ✓ Identidade dark mantida (header + footer)
- ✓ Visual confiável e premium

---

## V1 — Correções e Refinamentos Iniciais

### 1. IMAGENS CORRIGIDAS ✓

**Problema**: Caminhos incorretos + uso de Next Image
**Solução**:
- Caminhos atualizados em `products.ts`:
  - `/images/machao-icarus.png` (era icarus-tank.png)
  - `/images/dryfit.png` (era dryfit-tee.png)
- Substituído `<Image>` do Next.js por `<img>` HTML padrão
- Aplicado em: ProductCard, página de produto, checkout

### 2. CONTRASTE VISUAL REFINADO ✓

**Identidade mantida**: Dark, minimal, underground
**Melhorias aplicadas**:

#### CORES
- Fundo principal: `#000` (preto absoluto)
- Imagens dos produtos: fundo `#fff` (branco puro) para contraste máximo
- Texto primário: `#fff`
- Texto secundário: `#888` (cinza claro legível)
- Códigos/muted: `#666` com opacidade controlada

#### HIERARQUIA
- **Header**: mais espaço vertical (2.5rem), borda inferior sutil (#111)
- **Logo "KONTROL."**: maior (1.75rem), serif pesada
- **"training club"**: menor, opacity 0.6
- **"TC-11 DROP"**: título discreto, opacity 0.5, mais espaçamento (3rem top, 4rem bottom)

#### PRODUTOS
- **Imagens**: fundo branco puro (#fff), padding 2rem, object-fit: contain
- **Cards**: sem bordas, separados por espaçamento generoso (5rem mobile, 4rem desktop)
- **Nomes**: uppercase, letra maior (1.1rem), spacing 0.08em
- **Preços**: cinza claro (#888), menor destaque
- **Botões**: branco sólido com hover invertido (preto com outline branco)

#### ESPAÇAMENTO
- Main content: padding vertical de 6rem
- Grid gap: 5rem (mobile) / 4rem (desktop)
- Max-width produtos: 900px (centralizado)
- Footer: margin-top 6rem, border-top sutil

### 3. UX PREMIUM

- Transições suaves (0.2s/0.3s)
- Hover states refinados (opacity, color)
- Tipografia mais limpa e espaçada
- Visual "silent luxury" / training club profissional

### Estrutura Final

```
HOME (/)
├─ Header: KONTROL. + training club + cart
├─ TC-11 DROP (título discreto)
├─ Grid 2 produtos
│  ├─ ICARUS Training Tank — R$ 140
│  └─ TC-11 Dryfit Tee — R$ 125
└─ Footer

PRODUTO (/produto/[slug])
├─ Imagem grande (fundo branco)
├─ Nome + código + preço
├─ Seletor de tamanho
├─ Add to cart
├─ Descrição técnica
└─ Voltar ao drop

CHECKOUT (/checkout)
├─ Lista do carrinho
├─ Total
└─ Ações (limpar / continuar)
```

### Comandos

```bash
npm run dev   # desenvolvimento (localhost:3000)
npm run build # build de produção
npm start     # servidor de produção
```
