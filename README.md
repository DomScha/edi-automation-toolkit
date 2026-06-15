# 🧰 EDI Automation Toolkit

![Workflow Status](https://github.com/DomScha/edi-automation-toolkit/actions/workflows/auto-label.yml/badge.svg)
![License](https://img.shields.io/github/license/DomScha/edi-automation-toolkit)
![Last Commit](https://img.shields.io/github/last-commit/DomScha/edi-automation-toolkit)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

Eine Sammlung kleiner, fokussierter Tools rund um **GitHub Workflows, Automation, AI und EDI**. Statt einem großen Monolithen: einzelne Bausteine, die für sich funktionieren und sich kombinieren lassen.

---

## 📦 Module

### 🏷️ Auto Label
Automatisches Labeling für Issues und Pull Requests — basierend auf geänderten Dateien (PRs) und Keywords (Issues).

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

**Setup:**
1. Dateien kopieren:
   ```
   .github/workflows/auto-label.yml
   .github/labeler.yml
   ```
2. Labels im Repo anlegen (falls noch nicht vorhanden): `automation`, `documentation`, `ai`, `edi`, `api`, `dependencies`, `config`, `bug`, `enhancement`
3. Fertig — bei jedem PR/Issue läuft das automatisch.

**Tech:** GitHub Actions · [`actions/labeler`](https://github.com/actions/labeler) · [`actions/github-script`](https://github.com/actions/github-script)

---

### 🔜 Geplant
Weitere Module, die nach und nach dazukommen:

- **Repo Linter** — prüft README, LICENSE, .gitignore bei jedem Push
- **AI PR Reviewer** — fasst PR-Diffs via LLM zusammen und kommentiert automatisch
- **EDIFACT → JSON Konverter** — kleine API zur Umwandlung von EDI-Nachrichten

---

## Warum dieses Toolkit?

In Teams mit vielen Repos und PRs sparen kleine, konsistente Automatisierungsbausteine viel Zeit bei Reviews, Reporting und Priorisierung — genau die Art von Bausteinen, die in größeren CI/CD- und Workflow-Setups (z.B. EDI-Pipelines) den Unterschied machen.

## Tech Stack

![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
