# Design MD Library

Curated brand design-system specs imported from
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
(MIT, © 2026 VoltAgent). Each `<brand>.md` is the upstream `DESIGN.md`
for that brand, renamed for browsing convenience.

Use these as **reference seeds** when prototyping a new design language
in the lab tracks (`/lab/<brand>`). They are not consumed at build
time — purely human/agent reference docs.

The three files used by the existing lab pages — `Apple.md`,
`Airbnb.md`, `Intercom.md` — live at the parent directory
(`happytalk-enduser/`) and are loaded directly by the lab demos.
This library is the broader pool to draw from when adding new lab
pages.

To refresh from upstream:

```sh
git clone --depth 1 https://github.com/VoltAgent/awesome-design-md.git /tmp/awesome-design-md
for dir in /tmp/awesome-design-md/design-md/*/; do
  brand=$(basename "$dir")
  cp "${dir}DESIGN.md" "happytalk-enduser/design-md-library/${brand}.md"
done
```
