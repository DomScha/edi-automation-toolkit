# Contributing

Danke für dein Interesse am EDI Automation Toolkit! Dieses Repo ist primär ein persönliches Showcase-Projekt, aber Vorschläge, Bugfixes und neue Module sind willkommen.

## Wie beitragen?

1. **Fork** das Repo und erstelle einen neuen Branch für deine Änderung.
2. Halte Änderungen klein und fokussiert — ein PR = eine Sache.
3. Beschreibe in der PR-Beschreibung kurz, **was** geändert wurde und **warum**.
4. Stelle sicher, dass bestehende Workflows (Auto Label, Repo Linter, AI PR Reviewer) durch deine Änderung nicht kaputtgehen.

## Neue Module

Jedes Modul im Toolkit ist eigenständig:

- Ein eigener Workflow unter `.github/workflows/`
- Eine eigene Sektion in der README unter `## 📦 Module`
- Klare Setup-Anleitung, damit jeder das Modul isoliert in ein anderes Repo übernehmen kann

## Code-Stil

- GitHub Actions Workflows nutzen bevorzugt `actions/github-script` für Logik in JavaScript.
- Vermeide JavaScript-Template-Literals (`` `${...}` ``) innerhalb von `script:`-Blöcken — diese können mit dem GitHub Actions Expression-Parser kollidieren. String-Konkatenation (`+`) verwenden.
- Kommentare und README-Inhalte auf Deutsch, Code (Variablennamen, Funktionen) auf Englisch.

## Fragen?

Einfach ein Issue öffnen.
