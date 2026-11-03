# Simple Recipes

A phone-first recipe, staples and shopping-list app. Plain HTML, CSS and JavaScript; no build, account, server, tracking or paid service. All asset URLs are relative for GitHub Pages subdirectory hosting.

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, **main**, **/(root)**, then Save. The site is https://npcbetaproject.github.io/simple-recipes/ . No build command is needed. Future commits to main publish automatically.

## Use

- **Staples:** search, combine category / long-storage / shopping-only filters; cards sort A–Z. Keep is a preferred reserve target, not a stock count. Add purchases and adjust their quantities independently.
- **Recipes:** create/edit ingredients and instructions. Choose existing ingredients to share shopping state; existing staple ingredients establish actual recipe links. A matching exact ingredient name also reuses its identity. Recipe counts are calculated from these links, never text searches. Deleting a staple removes its link but retains the ingredient, recipe amounts and shopping item.
- **Shopping List:** group by category, edit purchase quantities and units, check off items and clear purchased items. Re-adding a listed item does not increase quantities or reset its checked state. Recipe quantities and purchase quantities are separate; there are no automatic conversions or inventory deductions.
- **Sample** marks starter entries. Editing them removes the label; your own entries have no sample label. Sample content appears only on first use.

## Storage and backup

Data saves automatically in this browser on this device under `simple-recipes.v1`. It does **not sync between devices**. Clearing site data or closing private browsing can remove it. Export JSON regularly through **Backups & help**; import on another device to transfer it. Imports validate the version, IDs, references, types, quantities and uniqueness before confirming replacement. Invalid imports leave current data untouched. Export before replacement if you want to retain it.

The format has `version: 1`, stable staple/recipe/ingredient/recipe-line IDs, shared ingredient records, and shopping entries keyed by ingredient ID. Future format changes should provide explicit migrations and preserve IDs; do not seed over saved data. If saved data is unreadable or from an unsupported version, the stored value is left untouched and an empty temporary workspace is used until a valid backup is imported. Blocked/full storage displays a warning; the app remains usable in memory and export still works.

Long-storage notes describe conditions, not guaranteed shelf life. Follow product and appliance guidance.

## Development and verification

Open through any static HTTP server (for example `python -m http.server 8000`). No dependencies are needed to run the app. `node --check app.js` checks JavaScript syntax. The optional test file uses Node's test runner and jsdom (development only): `npm install --no-save --package-lock=false jsdom`, then `node --test tests/app.test.cjs`.

Verification on this version: six automated regression suites cover combined filters, shopping quantities/checked state, reload persistence, stable rename/delete links, recipe creation/editing, duplicate prevention, export/import (including cancellation and invalid files), destructive confirmations, empty collection preservation and blocked/corrupt storage. A real Chromium browser was used for search, linked-recipe shopping, Back/Escape, reload and a new-recipe form. Layout fixtures at 320px, 375px and 768px were inspected; 320px staples, shopping and recipe editor/modal had no horizontal overflow. The app produced no JavaScript errors; browser-extension messages are outside the app. Fixed-width fixtures verify narrow layout, not a physical phone's keyboard or touch behavior.

A real browser JSON download/import round trip also passed, with replacement confirmation and the edited recipe and shopping items restored.

## Compact browsing update

Visible Edit controls have been removed as requested. Introductory copy and spacing are reduced; category buttons scroll horizontally and storage notes expand on demand. The first complete card is prioritized above the fold on a small phone; the full collection scrolls normally. Saved browser data and backup format are unchanged.

## Requested collection

The starter collection now has 12 staples and 5 recipes. Black turtle beans, canned tuna, rice bags, frozen smoked salmon, Kewpie mayo, nori, olive oil, oat milk and organic cereal use shared ingredient links. Recipes include Costa Rican black turtle beans, tuna sandwich, tuna mayo onigiri, rice and smoked salmon, and rice and beans. Flour, canned tomatoes, dried lentils and oats are retired starter staples; canned tomatoes remain a recipe ingredient. Existing untouched sample entries are updated once, while custom entries, recipe amounts and shopping state remain intact. The `appliedUpdates` marker prevents deleted entries from returning on subsequent loads. Eight automated regression suites pass, including collection updates and retired-staple migration.

## Bottom navigation and text backups

Staples, Recipes and Shopping List stay in a bottom navigation bar, with space reserved so content is not covered. Backups & help supports both JSON file downloads/imports and copy/paste. Copy backup text reveals a selectable complete JSON backup; if clipboard permission is unavailable, use the device Copy menu or Ctrl/Cmd+C. Paste a complete backup into the restore field to validate it and confirm replacement. Nothing is read from the clipboard automatically.

## Soba, freezer and pork additions

The collection now includes 20 starter staples and 9 recipes. Eight additions: soba buckwheat noodles, cold-soba sauce, green onion, frozen blueberries, bone-in pork chops, garlic powder, paprika powder and Japanese curry cubes. Linked recipes: cold soba, garlic/paprika pork chops, pork-bone congee and simple Japanese curry rice. Pork chops and congee share an ingredient ID so the same purchase cannot be added twice. Congee notes explain using saved bones and straining out fragments. Additions apply once to existing collections and backups; ten regression suites cover the resulting links, migration and duplicate prevention.

## Prepper checklist

The fourth bottom tab contains ten supplied readiness items and tasks. Tap an item name to open its use/tips, source links and editable status note. Check **Inventoried** independently of the **Need to acquire** star; starred items sort first, then alphabetically. A star can mean refill or another readiness action even when you own the item. Search and a starred-only filter help narrow the list.

Starting states match the supplied list: small battery power station and solar panel checked, other missing items starred; propane is checked as owned and starred for refill, with its partial-fill note. The two fuel tasks begin uncompleted and starred. These are starting states, not ongoing measurements. Every toggle and saved note persists in the same browser and is included in JSON file and text backups. Older backups gain this section once; existing checklist states are never reset on reload. Pantry quantities and food shopping remain separate.

Water, power and fuel tips link to Government of Canada, Ontario and municipal fire-safety guidance. Water-filter advice depends on the exact certified capabilities of the elements; brand alone is not a guarantee of safe water. Twelve automated regression suites cover checklist states, ordering, modal notes, reload, backup compatibility and import validation. Four-tab navigation and the tips modal were checked at 320px without horizontal overflow.
