Alert is an inline message on the page; Toast is a transient confirmation floated over it.

```jsx
<Alert tone="caution" title="Storm backlog">Same-day slots are full until Friday.</Alert>
<Toast message="Quote sent to Dana." onClose={dismiss} />
```

Tones: positive, caution, critical, info. Alerts stay put and explain; toasts are one line and disappear.
