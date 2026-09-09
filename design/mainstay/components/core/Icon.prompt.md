Inline Lucide glyph — use it anywhere an icon is needed instead of hand-written SVG.

```jsx
<Icon name="shield-check" size={20} />
<Icon name="phone" size={16} color="var(--accent-500)" label="Call us" />
```

- `size` 16 / 20 / 24 / 28+; `strokeWidth` stays at 2 except above 32px (use 1.75).
- Decorative by default (aria-hidden); pass `label` when the icon carries meaning alone.
- Available names: arrow-right, arrow-up-right, badge-check, briefcase, building-2, calculator, calendar, calendar-check, check, chevron-down, chevron-right, circle-check, clock, credit-card, droplets, file-text, hammer, hard-hat, info, leaf, loader, mail, map-pin, menu, message-square, minus, paint-roller, phone, plug-zap, plus, quote, ruler, scale, search, shield-check, star, thermometer, thumbs-up, triangle-alert, truck, user, wrench, x.
