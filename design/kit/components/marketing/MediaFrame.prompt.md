MediaFrame is the photo slot. This system ships no photography, so it renders a labelled placeholder until you pass a real `src`.

```jsx
<MediaFrame ratio="16 / 9" label="Van & crew" overlay>
  <h2 style={{ position: "absolute", bottom: 24, left: 24, color: "var(--text-inverse)" }}>Same-day service</h2>
</MediaFrame>
```

`overlay` applies the green bottom-up scrim used for text over photos. Label the slot with what belongs there.
