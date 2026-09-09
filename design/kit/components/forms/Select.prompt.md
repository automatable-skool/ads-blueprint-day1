Select is the native dropdown for short closed lists.

```jsx
<Field label="Job type"><Select placeholder="Choose one" options={["Repair", "Install", "Quote"]} /></Field>
```

Options accept plain strings or `{value,label}`. Over ~10 options, prefer a search input.
