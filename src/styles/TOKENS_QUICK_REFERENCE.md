# Quick reference – design tokens

Use estes tokens em qualquer componente para manter consistência visual.

## COLORS

```scss
color: var(--color-text-primary);         // Texto principal
color: var(--color-text-secondary);         // Texto secundário
background: var(--color-surface);          // Card / painel (fundo claro)
background: var(--color-background);       // Fundo da página
border-color: var(--color-border);         // Divisores, bordas
```

## SPACING

```scss
padding: var(--space-4);                   // 16px (padrão)
padding: var(--space-6);                   // 24px (card padding)
gap: var(--space-3);                       // 12px (entre itens)
margin-bottom: var(--space-8);             // 32px (entre seções)
```

## TYPOGRAPHY

```scss
font-size: var(--font-size-2xl);           // Título de página
font-size: var(--font-size-sm);            // Célula de tabela
font-weight: var(--font-weight-semibold);  // Títulos
font-weight: var(--font-weight-medium);    // Labels
```

## SHAPE

```scss
border-radius: var(--radius-md);           // Botões, inputs
border-radius: var(--radius-lg);           // Cards, wrapper de tabela
border-radius: var(--radius-xl);           // Dialogs, form cards
border-radius: var(--radius-full);         // Chips, avatares
```

## ELEVATION

```scss
box-shadow: var(--shadow-sm);              // Wrapper de tabela
box-shadow: var(--shadow-md);              // Form cards
box-shadow: var(--shadow-lg);              // Login card, popovers
```

## MOTION

```scss
transition: all var(--transition-fast);    // Hover
transition: all var(--transition-normal);   // Elementos de página
```
