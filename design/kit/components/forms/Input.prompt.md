Field + Input/Textarea are the text entry set; every input in a form is wrapped in a Field so the label, hint and error come from one place.

```jsx
<Field label="Phone" hint="We only call about this job" required>
  <Input type="tel" placeholder="(905) 555-0142" />
</Field>
<Field label="What do you need?" error="Tell us a little about the job">
  <Textarea rows={4} invalid />
</Field>
```

Focus draws the green border plus the amber focus ring. `invalid` turns the border red; pass `error` on the Field for the message.
