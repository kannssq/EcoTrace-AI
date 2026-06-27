# EcoTrace AI - Stateful Multi-Agent Sustainability Auditor

EcoTrace AI is an autonomous, stateful multi-agent auditing framework that ingests unstructured supply chain documentation, evaluates lifecycle carbon footprints, and optimizes logistics routing for minimal environmental impact. 

The accompanying interactive dashboard provides deep visual insights into multi-agent operations, dynamic eco-safe navigation paths, and actionable carbon offset metrics.

---

##  The Problem & The Solution
*  **The Problem:** Corporate shipping fleets generate massive carbon footprints, but tracking these emissions requires digging through thousands of messy PDFs and shipping manifests. To make it worse, standard GPS apps route trucks straight into heavy traffic gridlocks, causing massive fuel waste and idling emissions.
*  **The Solution:** EcoTrace AI automatically reads those messy files using smart AI agents, instantly calculates the carbon footprint, and acts as an "eco-friendly GPS" to redirect fleets onto low-emission routes. It even translates complex data into simple terms—like showing exactly how many trees you need to plant to cancel out your trip's pollution!

---

##  What EcoTrace AI Does
* **Automates Sustainability Audits:** Instead of compliance officers spending hours digging through chaotic shipping manifests, corporate PDFs, and supply chain CSVs, our AI agents parse and evaluate the data instantly.
* **Calculates Real-World Footprints:** The system dynamically computes carbon footprint tonnage and maps out an immediate environmental offset score, translating abstract data into tangible impacts (like the exact number of trees needed to neutralize the emissions).
* **Optimizes Fleet Navigation:** It doesn't just calculate data—it takes action. The framework looks beyond the shortest physical route to recommend eco-safe alternatives that bypass carbon-heavy traffic congestion grids.

---

##  System Architecture & Tech Stack

The application splits computational heavy lifting away from user experience using a modular local stack:
* **Backend Core:** Python, FastAPI, and **LangGraph** orchestrating a stateful sequential agent loop (*Parser Agent* $\rightarrow$ *Emissions Agent* $\rightarrow$ *Navigator Agent*).
* **Frontend UI:** Vanilla HTML5, JavaScript (ES6+ async/fetch), and Tailwind CSS for real-time telemetry streaming and dashboard rendering.

---

##  Features & Implementation Updates

### Frontend Core Interface
* **Responsive Grid Scaling:** Reconfigured primary grid layout to support 3 equal dashboard pillars on desktop viewports using utility-first classes (`md:grid-cols-3`).
* **Environmental Offset Analytics:** Positioned a localized tracker card adjacent to the primary telemetry boards to surface tangible mitigation targets.
* **Semantic Iconography & Target Mapping:** Deployed a visual tree leaf configuration (`text-green-400` inside a `bg-green-500/10` container) linked directly to a strict DOM identifier selector (`#offset-value`).
* **Data Scoping Metadata:** Embedded descriptive target metadata (`"Trees required for 1-year offset"`) beneath the main evaluation panel integers.

### Dynamic Dashboard Scripting
* **DOM Tracking Integrations:** Configured target array selectors to intercept incoming execution streams safely.
* **Exponential Easing Animations:** Engineered a high-performance numerical scaling utility (`animateCount`) to transition scorecard totals from zero states smoothly once backend graph pipelines resolve.
* **Telemetry Data Parsing:** Designed extraction layers to pull metric weights (`co2_tons`) directly out of the raw response payload.
* **Targeted Animation Formats:**
  * **CO2 Footprint:** Precision float calculation climbing from baseline to target weight strings.
  * **Audit Efficiency Score:** Percentage-appended integer scaling to reflect dynamic graph operation accuracy.
  * **Environmental Offset:** Localized math processing translating payload tonnage into required mature tree allocations.

---

##  Installation & Local Execution

Follow these steps to initialize and run the EcoTrace AI system locally on your machine.

### 1. Initialize the Backend Brain
Ensure you have Python 3.10+ installed. Open your terminal, navigate to the backend directory, install the required libraries, and boot up the server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
