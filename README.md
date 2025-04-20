# ☕ Espresso Tracking Tool

## Why?

Because we like **data**, and we love **espresso**.

We believe every shot pulled is a learning opportunity. This tool is built by espresso lovers who also happen to love clean code, modern design, and insightful feedback loops. It’s not just about better coffee — it’s about better process.

## What?

The Espresso Tracking Tool is a minimalist, responsive web app designed to help you log, visualize, and reflect on your espresso journey.

Whether you're tuning your grind, experimenting with dose/yield ratios, or comparing coffee beans — this tool gives you the power to record it all and learn from it.

---

## Features

- 📈 **Brew Logging**  
  Capture details like coffee weight, yield, brew time, boiler temp, and grind setting.

- 📊 **Charts**  
  Visualize your ratios and brews over time — spot trends, refine technique.

- ☕ **Coffee Type Management**  
  Log and organize your beans: origin, roaster, elevation, roast level, flavor notes.

- 🛠 **Machine Maintenance Logging** *(coming soon)*  
  Keep track of when you backflushed, replaced filters, or changed gaskets.

- 🌙 **Dark Mode**  
  Modern, theme-aware UI built with warm Malta-inspired earth tones.

- 🧰 **Local-first storage (JSON-backed)**  
  No cloud, no account, no nonsense. Your data stays with you.

---

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS + [shadcn/ui](https://ui.shadcn.dev/) components
- **Charts**: [Recharts](https://recharts.org/)
- **Data storage**: Express + local JSON files (via custom backend)
- **Deployment target**: Self-hostable via Docker (Raspberry Pi–friendly)

---

## Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

### 🧪 Local Dev Setup

```bash
# 1. Install dependencies
npm install

# 2. Run frontend in dev mode
npm run dev
