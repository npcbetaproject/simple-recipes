# Simple Recipes repository instructions

Keep the app buildless (plain HTML, CSS and JavaScript) and compatible with GitHub Pages subdirectory hosting. Preserve stable IDs, localStorage data and existing backup compatibility. Read README.md and the current implementation before changing records.

## Required review for every new prepper item

- Decide whether the entry is a one-time acquisition or a recurring refill, maintenance or readiness task. Do this before adding it to the repository.
- Recurring tasks default to a **three-calendar-month review**: include their stable IDs in `RECURRING_PREPPER_IDS`, or explicitly provide `reviewEveryMonths: 3` when defining the entry. One-time durable equipment uses `reviewEveryMonths: 0`.
- An item may be owned (`inventoried: true`) and still need attention (`priority: true`), such as a propane cylinder that needs refilling. Keep these flags independent.
- Clearing Need to acquire starts a recurring item's next review. At the due date it must re-star and sort to the top without changing Inventoried, status notes, recipes or shopping data.
- Preserve the user's stored recurrence settings and due timestamps during updates and imports. Only initialize missing fields; do not reset dates on ordinary reloads. Dates are included in file and text backups.
- Use calendar-month arithmetic with end-of-month clamping, not a fixed 90-day approximation. Check overdue items when the page opens, regains focus or becomes visible, and while it remains open. Do not claim notifications run while the browser is closed.
- Give each item concise practical tips and appropriate primary safety sources where relevant. Do not treat brand names as guarantees of water safety or invent fuel-storage rules.

Run `node --check app.js` and the existing regression suite. For recurrence changes, test month-end rollover, before/at/after the due date, reload, backup compatibility, per-item opt-out and preservation of inventory state. Keep asset version URLs current when publishing changes.
