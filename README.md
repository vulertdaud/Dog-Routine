# Dog Routine Manager

A modern, mobile-first dog routine planner built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Zustand. Track daily tasks, mark them complete, review history, and visualize weekly progress.

## ✨ Features

- **Auth-lite profile**: Owner + dog profile with avatar fallback and local storage persistence.
- **Routine templates**: Create, edit, toggle, and delete routine tasks with time-of-day, frequency, and reminders.
- **Today checklist**: Task groups by time of day, quick notes, completion timestamps, and “mark all done / reset day”.
- **History**: Date-driven list view using URL state (`/history?date=YYYY-MM-DD`).
- **Analytics**: Weekly completion chart + streak count.
- **UI polish**: Sidebar + mobile bottom nav, cards, dialogs, toasts, empty states, theme toggle.
- **Local-first storage**: Zustand + localStorage persistence with seed data on first load.
- **API mode scaffold**: Next.js Route Handler stub ready for Prisma/SQLite.

## 🧱 Tech Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI primitives
- Zustand
- lucide-react icons
- recharts

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 🗂️ Project Structure

```
app/
  today/          # daily checklist
  routine/        # task templates
  history/        # past days
  analytics/      # charts + streaks
  settings/       # owner + dog profile
components/
  ui/             # shadcn/ui components
  layout-shell.tsx
  sidebar.tsx
  bottom-nav.tsx
  task-card.tsx
  task-group.tsx
  task-form-modal.tsx
  stats-card.tsx
  weekly-chart.tsx
lib/
  date.ts
  seed.ts
  config.ts
store/
  useDogRoutineStore.ts
```

## 🔌 API Mode (Scaffold)

There is a Route Handler stub at `app/api/routine/route.ts` and an `API_MODE` flag in `lib/config.ts`. When you’re ready to add a backend:

1. Add Prisma + SQLite configuration.
2. Implement the CRUD logic in the Route Handlers.
3. Switch the app to load/store data via the API layer.

## 🧭 Roadmap

- Real authentication + multi-owner profiles
- Multi-dog support with per-dog routines
- Scheduled reminders + notifications
- Advanced analytics (trendlines, category breakdowns)
- Sync across devices (cloud + offline cache)

## 📝 Notes

Seed data is loaded on first run and stored in localStorage, so you can immediately explore the UI without setup.
