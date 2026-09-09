PlanCard sells the recurring plan — the one offer on a service site that isn't a one-off job.

```jsx
<PlanCard price="$34.99" period="per month" footnote="12 month minimum. Cancel anytime."
  title="Join the Comfort Club" description="Two tune-ups a year, 5% off repairs, same-day service."
  perks={["2 tune-ups / year", "5% off repairs", "Same-day service", "No overtime fees"]}
  action={<Button variant="accent">Join now</Button>} />
```

One per page. Four to six perks; anything longer belongs on its own page.
