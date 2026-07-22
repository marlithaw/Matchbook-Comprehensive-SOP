# Matchbook Learning — Staff Handbook Library

A self-contained, staff-facing set of handbooks for **Matchbook Learning Schools
of Indiana (MBLI)**, built on the Matchbook Learning Design System.

## Structure

The site is a two-tier library — one front door, many handbooks:

- **`index.html`** — the **Staff Handbook Library** landing page. A gateway with a
  card grid where staff choose a handbook. Group A links to the local MBLI operating
  handbooks below; Group B links out to the HR & leadership
  [Handbook Library](https://bgutzwiller-eng.github.io/Handbook-Repository/index.html).
- **`handbook.html`** — the full 13-section **SOP Handbook 2026–27** (previously
  `index.html`). Sidebar nav, live search, mark-as-read progress, and print styles.
- **Detailed playbooks** — `campus-culture-operations.html`,
  `restorative-counseling-handbook.html`, `culture-student-support-playbook.html`,
  `personalized-learning.html`, and `parent-student-handbook.html`. Each links back to
  its handbook section.

Every page is a single, dependency-free HTML file. Open `index.html` in any browser.

### Merging in the HR Handbook Library

Group B cards currently link out to the live reference site. To fold those handbooks
into a single deployment later, copy their HTML into this repo (e.g. an `hr/` folder)
and repoint the Group-B `href`s in `index.html` from the live URLs to the local files —
the card group is already isolated, so it is a drop-in swap.

## Features

- **13-section handbook** — Introduction; Professional Practice & Staff Development;
  Academics & Instruction; Assessment & Grading; Culture & Behavior Systems; Student
  Support Systems; Special Education; Multilingual Learners; Attendance & Accountability;
  Safety; Family & Community Engagement; Technology & Digital Systems; and Personalized &
  Competency-Based Learning.
- **Sticky sidebar navigation** with the brand wordmark and jump-to links.
- **Live search** across every section card, with highlighted snippets and click-to-jump.
- **Mark-as-read** tracking per section, persisted in `localStorage`, with a progress bar.
- **Collapsible accordion cards** for each subsection.
- **Print / Save as PDF** — expands all sections and opens the print dialog; dedicated
  print styles are included.
- **Responsive** — a slide-in drawer nav on narrow screens.

## Design fidelity

The visual system mirrors the Matchbook Learning brand tokens: Spark Red (`#E21C24`),
Dream Yellow (`#F9DC7C`), Charcoal (`#232323`), and the Anton / Oswald / Mulish type
families. The proprietary `x-dc` design-canvas runtime is reimplemented in dependency-free
vanilla JavaScript. The library landing (`index.html`) reuses these tokens and the
Matchbook flame mark, adding the **Fraunces** display serif for its editorial headlines.

Content is sourced from the *Matchbook SOP Handbooks 2026-27* source document.
