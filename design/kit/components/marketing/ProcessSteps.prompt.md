ProcessSteps answers "what actually happens when I call" — the section that removes hesitation before booking.

```jsx
<ProcessSteps steps={[
  { title: "You call, we answer", body: "No phone menus. Someone picks up and books you in.", badge: "No robots", image: "", imageLabel: "On the phone" },
  { title: "Honest diagnosis", body: "The tech explains the fault in plain English before touching a tool." },
  { title: "Upfront quote", body: "Parts and labour, in full, before any work starts." }
]} />
```

Three or four steps, one sentence each. `layout="rows"` for the calm page style, where it sits beside a photo instead of spanning the page.
