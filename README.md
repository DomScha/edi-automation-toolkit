# 🏷️ Auto Label

![Workflow Status](https://github.com/DomScha/auto-label/actions/workflows/auto-label.yml/badge.svg)
![License](https://img.shields.io/github/license/DomScha/auto-label)
![Last Commit](https://img.shields.io/github/last-commit/DomScha/auto-label)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)

Automatisches Labeling für Issues und Pull Requests — basierend auf geänderten Dateien (PRs) und Keywords (Issues).

Teil meines **EDI Automation Toolkit** — kleine, fokussierte Tools rund um GitHub Workflows, Automation und AI.

---

## Was macht es?

**Pull Requests** werden automatisch gelabelt basierend auf den geänderten Dateipfaden:

| Geänderte Dateien | Label |
|---|---|
| `.github/workflows/**` | `automation` |
| `**/*.md`, `docs/**` | `documentation` |
| `**/ai/**`, `*prompt*`, `*llm*` | `ai` |
| `**/edi/**`, `*edifact*`, `*x12*` | `edi` |
| `**/api/**`, `*.openapi.yml` | `api` |
| `package.json`, `requirements.txt` | `dependencies` |

**Issues** werden basierend auf Titel & Beschreibung gelabelt (z.B. "bug", "enhancement", "automation", "ai", "edi").

---

## Setup

1. Dateien kopieren:
   ```
   .github/workflows/auto-label.yml
   .github/labeler.yml
   ```

2. Labels im Repo anlegen (falls noch nicht vorhanden): `automation`, `documentation`, `ai`, `edi`, `api`, `dependencies`, `config`, `bug`, `enhancement`

3. Fertig — bei jedem PR/Issue läuft das automatisch.

---

## Warum das relevant ist

In Teams mit vielen Repos und PRs spart konsistentes Labeling Zeit bei Reviews, Reporting und Priorisierung. Genau die Art von "kleinem Automatisierungsbaustein", der in größeren CI/CD- und Workflow-Setups (z.B. EDI-Pipelines) den Unterschied macht.

## Tech

- GitHub Actions
- [`actions/labeler`](https://github.com/actions/labeler)
- [`actions/github-script`](https://github.com/actions/github-script)
