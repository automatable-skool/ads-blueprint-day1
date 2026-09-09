Rating shows a star score, optionally with the numeric average and review count.

```jsx
<Rating value={4.9} count={182} showValue />
```

Only ever show numbers you actually have. Stars are brand blue with grey outlines for empties; pass `tone="on-brand"` on a blue band and they turn white. They deliberately do not use the accent colour — it is too light to read on white.
