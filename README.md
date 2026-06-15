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

### 🔍 Repo Linter

Prüft bei jedem Push und Pull Request, ob wichtige Dateien im Repository vorhanden sind — und postet einen Report als PR-Kommentar sowie als Job-Summary.

**Geprüft wird auf:**

| Datei | Status |
|---|---|
| `README.md` | empfohlen |
| `LICENSE` | empfohlen |
| `.gitignore` | empfohlen |
| `CONTRIBUTING.md` | optional |
| `.github/CODEOWNERS` | optional |
| `.github/ISSUE_TEMPLATE` | optional |

Ergebnis ist ein **Repo Health Score** (in %), der zeigt, wie vollständig das Repo aufgestellt ist.

**Setup:**
1. Datei kopieren:
   ```
   .github/workflows/repo-linter.yml
   ```
2. Fertig — läuft automatisch bei Push auf `main` und bei jedem PR.

Bei PRs wird ein Kommentar mit dem Report gepostet (und bei wiederholten Runs aktualisiert, statt neue Kommentare anzuhäufen). Fehlen empfohlene Dateien, wird zusätzlich eine Warning im Workflow-Run angezeigt — der Job schlägt aber nicht hart fehl, damit das Setup nicht blockiert wird.

**Tech:** GitHub Actions · [`actions/github-script`](https://github.com/actions/github-script) · [Job Summaries](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary)

---

### 🤖 AI PR Reviewer

Fasst bei jedem Pull Request den Diff per Anthropic Claude API zusammen und postet eine kurze Review als PR-Kommentar — was wurde geändert, worauf sollte ein Reviewer achten, optionale Stil-Hinweise.

**Was es macht:**
- Holt den Diff zwischen PR-Branch und Base-Branch (begrenzt auf ~12.000 Zeichen, ohne Lock-Dateien)
- Schickt Titel, Beschreibung und Diff an Claude (`claude-sonnet-4-6`)
- Postet das Ergebnis als Kommentar (wird bei neuen Commits aktualisiert statt dupliziert)

**Setup:**
1. Datei kopieren:
   ```
   .github/workflows/ai-pr-reviewer.yml
   ```
2. Repository Secret anlegen: Settings → Secrets and variables → Actions → New repository secret
   - Name: `ANTHROPIC_API_KEY`
   - Value: dein Anthropic API Key
3. Fertig — läuft automatisch bei jedem PR.

**Hinweis:** Der Review ersetzt kein menschliches Review, sondern gibt einen schnellen ersten Überblick — besonders nützlich bei größeren Diffs oder zur Vorbereitung auf das eigentliche Review.

**Tech:** GitHub Actions · Anthropic Claude API · [`actions/github-script`](https://github.com/actions/github-script)

---

### 🔜 Geplant
Weitere Module, die nach und nach dazukommen:

- **EDIFACT → JSON Konverter** — kleine API zur Umwandlung von EDI-Nachrichten

---

## Warum dieses Toolkit?

In Teams mit vielen Repos und PRs sparen kleine, konsistente Automatisierungsbausteine viel Zeit bei Reviews, Reporting und Priorisierung — genau die Art von Bausteinen, die in größeren CI/CD- und Workflow-Setups (z.B. EDI-Pipelines) den Unterschied machen.

## Tech Stack

![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
