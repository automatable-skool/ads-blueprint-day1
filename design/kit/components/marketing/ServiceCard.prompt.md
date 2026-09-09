ServiceCard is one service or package in a services grid; the whole card is the link.

```jsx
<ServiceCard icon="wrench" title="Drain clearing" description="Camera inspection included on every visit." price="From $149" href="/services/drains" />
```

Pass `image` (even as `""`) to swap the icon tile for a 16:9 photo slot with the icon inset over it — use it when the services are visual (finished rooms, installs, shoots). Lay out three or four in a `grid` with `gap: var(--space-6)`. Hover lifts 2px and slides the arrow. Keep descriptions to one sentence.
