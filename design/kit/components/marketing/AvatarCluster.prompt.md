AvatarCluster is the hero's social proof: a few overlapping faces, a star, a rating and a review count.

```jsx
<AvatarCluster people={["DR","MT","PS"]} rating="4.9" label="700+ verified Google reviews" tone="on-brand" />
```

Three to five avatars. Until real headshots exist they render as tinted initial discs — pass `{ initials, src }` to swap in photos. On a blue band use `tone="on-brand"`.
