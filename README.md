# EcoTrace AI - Stateful Multi-Agent Sustainability Auditor

# Walkthrough: Environmental Offset Dashboard Scorecard

I have successfully added the **Environmental Offset** scorecard metric and dynamic count-up animations to the dashboard.

## Changes Made

### Frontend

#### [index.html](file:///c:/Users/Kanishk/OneDrive/Desktop/EcoTrace-AI/frontend/index.html)
- Modified the grid to support 3 equal columns on desktop layouts using Tailwind (`md:grid-cols-3`).
- Added the "Environmental Offset" card adjacent to the "Audit Efficiency Score" card.
- Equipped the card with a clean green leaf icon (`text-green-400` with `bg-green-500/10` background) and the ID `#offset-value` for dynamic script updating.
- Placed the small subtext `Trees required for 1-year offset` under the tree count.

#### [script.js](file:///c:/Users/Kanishk/OneDrive/Desktop/EcoTrace-AI/frontend/script.js)
- Selected the new `#offset-value` element from the DOM.
- Created a custom easing count-up function (`animateCount`) to transition the scorecard numbers smoothly when results are ready.
- Extracted the CO2 tonnage (`co2_tons`) from the emissions agent response.
- Calculated the required mature trees: `Math.round(co2_tons * 45)`.
- Applied the count-up animation to all three scorecard metrics:
  - **CO2 Footprint**: counts up from 0 to 12.4 with float formatting.
  - **Audit Efficiency Score**: counts up from 0 to 78 with percentage suffix.
  - **Environmental Offset**: counts up from 0 to 558 with "Trees" suffix.

---

## Verification Results

### End-to-End Test
1. Started the FastAPI backend server on `http://127.0.0.1:8000`.
2. Loaded the frontend interface.
3. Triggered the multi-agent routing audit.
4. Confirmed:
   - The UI correctly displays the new metric scorecard styled with the green leaf icon.
   - The calculations are accurate (`12.4 Tons * 45 = 558 Trees`).
   - The numbers animate smoothly to their final targets as shown in the screenshot below.

---

## Visual Demonstration

> [!NOTE]
> Below is a visual representation of how the three dashboard scorecard metrics look in the updated dashboard layout.

| Calculated CO2 Footprint | Audit Efficiency Score | Environmental Offset |
| :--- | :--- | :--- |
| **12.4 Tons** (Red Fire Icon) | **78%** (Green Check Icon) | **558 Trees** (Green Leaf Icon) |
| *Calculated emissions* | *System efficiency* | *Trees required for 1-year offset* |
