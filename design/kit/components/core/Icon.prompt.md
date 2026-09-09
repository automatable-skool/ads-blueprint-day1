Icon renders one Lucide glyph in currentColor; it is the only icon primitive — never inline a hand-drawn SVG.

```jsx
<Icon name="phone" size={18} color="var(--accent-800)" label="Call" />
```

Sizes: 14–16 inline with text, 18–20 in controls, 22–28 as a feature mark. Stroke stays at the 1.75 default. Available names are the keys of `ICONS` (mirrors of `assets/icons/*.svg`); if a glyph is missing, copy the SVG from lucide.dev into `assets/icons/` and add it there rather than improvising.
