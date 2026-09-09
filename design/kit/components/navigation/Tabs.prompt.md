Tabs switch between peer views on one screen (Today / Week / Unassigned).

```jsx
<Tabs value={tab} onChange={setTab} tabs={[{value:"today",label:"Today",icon:"calendar"},{value:"quotes",label:"Quotes",icon:"file-text"}]} />
```

The active tab gets the amber underline. Two to five tabs; beyond that use a sidebar.
