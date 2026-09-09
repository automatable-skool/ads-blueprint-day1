Button is the action control for every surface; one amber `accent` button per screen marks the money action (call, book, get a quote).

```jsx
<Button variant="accent" size="lg" iconLeft={<Icon name="phone" size={18} />}>Call (905) 555-0142</Button>
<Button variant="secondary">See our work</Button>
```

Variants: primary (green), accent (amber), secondary (outlined), ghost, danger. Sizes sm/md/lg; `block` fills width on mobile; `href` renders an anchor. Hover lightens, press nudges down 1px with an inset shadow.
