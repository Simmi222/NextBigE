# Interactive Data Visualization Dashboard
Last Updated: 2025-11-17
  


This is a small React + TypeScript dashboard (Vite) demonstrating reusable visualization components and features requested in the assignment.

Features implemented:
- Line chart for revenue trends (Recharts)
- Bar chart for department performance
- Pie chart for budget allocation
- Heatmap for employee attendance (weekly grid)
- Date-range selector affecting charts
- Department filter
- Responsive layout
- Light / Dark theme toggle
- Export charts as SVG and PNG (serializes first SVG found on page)
- Loading skeletons and basic ARIA attributes for accessibility

Quick start (Windows PowerShell):
```powershell
cd "c:\Users\Simaran\OneDrive\Desktop\NextBigE";
npm install;
npm run dev
```

Notes and next steps:
- Install will add dependencies (react, recharts, date-fns, vite). If you prefer yarn or pnpm adjust commands.
- Export currently serializes the first <svg> in the DOM; for production pass component refs to export helpers.
- Accessibility: basic ARIA labels and keyboard focusability are provided; more work could be done for complex charts (aria-describedby, live regions for tooltip announcements).

Full submission README (required items)

Project Overview
----------------
This project is an interactive data visualization dashboard built with React + TypeScript and Vite. It demonstrates reusable chart components (Line, Bar, Pie, Heatmap), theme switching, data filtering, chart export, and accessibility features.

Features
--------
- Line chart showing revenue trends
- Bar chart comparing department revenue
- Heatmap for employee attendance
- Pie chart for budget allocation
- Date range selector affecting all charts
- Department filter
- Light / Dark theme toggle (with high contrast variables)
- Export charts as PNG and SVG
- Responsive layout and skeleton loading states
- Accessibility: ARIA labels, keyboard focusable elements


Live Demo
---------
You can view the deployed dashboard here:

[https://next-big-e.vercel.app/](https://next-big-e.vercel.app/)

Chart Libraries Used
--------------------
- Line & Bar & Pie → Recharts
- Heatmap → Custom SVG grid (React), inspired by Nivo-style rendering

How to Use
----------
Select a date range and department filter at the top → all charts update automatically. Use the toggle button to switch theme and the export buttons to download charts.

Installation
------------
Clone and install:

```powershell
git clone <repo-url> my-dashboard
cd my-dashboard
npm install
```

Run dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Testing
-------
This project uses Vitest + React Testing Library.

Run tests:

```powershell
npm run test
# or
npx vitest run
```

Data generation
---------------
Sample data is generated in `src/data/sampleData.ts` using `generateSampleData(days)` which returns an array of `MetricData`. For a clean, documented example, see `src/data/sampleMetrics.ts` which contains a small static example. The generator creates daily entries per department with random-ish revenue, expenses, attendance, and budgetAllocation. This data is synthetic and only for demo purposes.

Folder structure
----------------
src/
 ├── components/       # Reusable React components (charts, controls)
 ├── data/             # Sample data and data generation
 ├── utils/            # Utilities (filters, export helpers)
 ├── __tests__/        # Unit tests
 ├── types.ts          # Type definitions
 └── App.tsx           # App wiring and layout

Screenshots
-----------
![Dashboard Light Mode](./screenshot-light.png)
![Dashboard Dark Mode](./screenshot-dark.png)

Notes on scoring checklist
-------------------------
- README: contains overview, install, run, testing, data explanation, folder structure.
- Tests: basic filter unit tests and render smoke tests included (Vitest).
- Accessibility: ARIA labels and keyboard focusable interactive elements added.
- Export: export helpers included (see `src/utils/export.ts`).

