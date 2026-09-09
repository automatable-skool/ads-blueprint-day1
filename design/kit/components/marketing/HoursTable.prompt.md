HoursTable lists opening hours with today highlighted.

```jsx
<HoursTable todayIndex={2} rows={[{day:"Monday",hours:"7am–7pm"},{day:"Sunday",hours:"Closed"}]} />
```

Pass `tone="on-brand"` in a blue footer — rules, today's tint and cell colours switch to white-on-blue. Closed days grey out; today is tinted with `--surface-accent-soft`. Pair with ContactBar in the footer.
