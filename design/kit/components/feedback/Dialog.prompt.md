Dialog is the modal sheet for confirmations and short forms. It positions absolutely, so mount it inside a `position:relative` container.

```jsx
<Dialog open={open} title="Confirm Thursday, 9–11am?" description="We'll text a reminder the day before."
  footer={<><Button variant="secondary" onClick={close}>Back</Button><Button variant="accent">Book it</Button></>}
  onClose={close} />
```

One decision per dialog; the confirming action is the amber button on the right.
