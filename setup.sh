#!/usr/bin/env bash
# Run once, right after cloning. Copies the starters into your working files.
#
# Why this exists: everything this creates is gitignored, so it is YOURS. When
# an update ships you run `git pull` and it lands cleanly, because your work and
# the repo's work never touch the same files.
set -e
[ -d website ]  || { cp -R website-starter website; echo "created website/ from the starter"; }
for f in $(cd starters && find . -type f | sed 's|^\./||'); do
  [ -f "$f" ] || { mkdir -p "$(dirname "$f")"; cp "starters/$f" "$f"; echo "created $f"; }
done
echo
echo "Done. website/ and your context files are yours now - git will not touch them."
echo "Next: /account-setup, then /api-setup"
