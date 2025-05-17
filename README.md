# ☕ Espresso Tracking Tool

## Why?

Because we like **data**, and we love **espresso**.

We believe every shot pulled is a learning opportunity. This tool is built by espresso lovers who also happen to love clean code, modern design, and insightful feedback loops. It’s not just about better coffee — it’s about better process.
Tracking your brews over time will allow you to confirm what you like, highlight what you don't like and show you where you've yet to explore.

## What?

The Espresso Tracking Tool is a minimalist, responsive web app designed to help you log, visualize, and reflect on your espresso journey.

Whether you're tuning your grind, experimenting with dose/yield ratios, or comparing coffee beans — this tool gives you the power to record it all and learn from it.

This tool is intended to be responsive across multiple devices and accessed locally on your network.

---

## Features

- 📈 **Brew Logging**  
  Capture details like coffee weight, yield, brew time, boiler temp, and grind setting.

- 📊 **Analytics**  
  Gain insights on your brews over time — spot trends, refine technique.

- ☕ **Coffee Type Management**  
  Log and organize your beans: origin, roaster, elevation, roast level, flavor notes.

- 🛠 **Machine Maintenance Logging** *(coming soon)*  
  Keep track of when you backflushed, replaced filters, or changed gaskets.

- ⚙️ **User Settings** *(coming soon)*  
  Better understand your preferences and keep track of your brew vessels.

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
- **Deployment target**: Self-hostable via Docker (Raspberry Pi–friendly) *(coming soon)*

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
```
Backend (server.js) runs separately:

```bash
# 3. In another terminal tab
node server/server.js
```
Then visit http://localhost:5173

### 🐳 Docker
You can also run the app fully containerized:

```bash
docker compose up --build
```

Access app at http://localhost:3000
API served at http://localhost:4000

## 🛣 Roadmap

- ✅ Coffee type management
- ✅ Brew tracking and charting
- ✅ Sidebar + mobile navigation
- ✅ Responsive layout + dark mode
- ✅ Machine maintenance form
- ⬜ User settings / preferences
- ⬜ SQLite migration option
- ⬜ Optional cloud backup or export
- ⬜ PWA for offline use

### 👥 Contributing

This is a personal learning project — but if you’re an espresso data nerd with UI/UX chops or analytics ideas, feel free to fork and submit a PR or issue!