StatBlock is one proof figure; TrustRow is the licence/insurance/guarantee line.

```jsx
<StatBlock value="1,400+" label="jobs completed since 2011" icon="badge-check" />
<TrustRow items={["Licensed & insured", "1-year workmanship warranty", "Upfront pricing"]} iconColor="var(--blue-600)" />
```

TrustRow inherits its text colour, so on a blue band just set `color` on the wrapper and pass `iconColor="var(--blue-200)"`. Three or four stats in a row, maximum. Every claim must be true for the business using the template.
