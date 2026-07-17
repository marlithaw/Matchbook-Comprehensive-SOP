# Matchbook Learning — SOP Handbook 2026–27

A self-contained, staff-facing implementation of the **Matchbook SOP Handbook**
design (`Matchbook SOP Handbook.dc.html`) from the Matchbook Learning Design System.

`index.html` is a single, dependency-free HTML file. Open it in any browser.

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
vanilla JavaScript.

Content is sourced from the *Matchbook SOP Handbooks 2026-27* source document.
