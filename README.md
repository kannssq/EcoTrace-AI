# EcoTrace AI — Stateful Multi-Agent Sustainability Auditor

<p align="center">
  <strong>Assemble, configure, and deploy autonomous sustainability AI Agent(s) in your browser.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/python-%3E%3D3.10-green" alt="Python Version">
  <img src="https://img.shields.io/badge/lang-English-blue" alt="Language English">
  <img src="https://img.shields.io/badge/framework-LangGraph-orange" alt="LangGraph">
  <img src="https://img.shields.io/badge/styling-TailwindCSS-brightgreen" alt="Tailwind CSS">
</p>

---

EcoTrace AI allows you to configure and deploy Autonomous AI agents to audit complex corporate supply chains. Supply chain managers can upload logistics data and have the system embark on carbon tracking goals. It attempts to reach the goal by orchestrating multiple specialized agents, thinking of tasks to do, executing them sequentially, and learning from the environmental results 🚀.

---

## ⚖️ The Problem & The Solution

* ❌ **The Problem:** Corporate shipping fleets generate massive carbon footprints, but tracking these emissions requires digging through thousands of messy PDFs and shipping manifests. To make it worse, standard GPS apps route trucks straight into heavy traffic gridlocks, causing massive fuel waste and idling emissions.
* 💡 **The Solution:** EcoTrace AI automatically reads those messy files using smart AI agents, instantly calculates the carbon footprint, and acts as an "eco-friendly GPS" to redirect fleets onto low-emission routes. It even translates complex data into simple terms—like showing exactly how many trees you need to plant to cancel out your trip's pollution!

---

## 💡 What EcoTrace AI Does

* 🔐 **Automates Sustainability Audits:** Instead of compliance officers spending hours digging through chaotic shipping manifests, corporate PDFs, and supply chain CSVs, our AI agents parse and evaluate data instantly.
* 🌲 **Calculates Real-World Footprints:** The system dynamically computes carbon footprint tonnage and maps out an immediate environmental offset score, translating abstract data into tangible impacts (like the exact number of trees needed to neutralize the emissions).
* 📍 **Optimizes Fleet Navigation:** It doesn't just calculate data—it takes action. The framework looks beyond the shortest physical route to recommend eco-safe alternatives that bypass carbon-heavy traffic congestion grids.

---

## 🏗️ System Architecture & Tech Stack

The application splits computational heavy lifting away from user experience using a modular local stack:
* **Backend Core:** Python, FastAPI, and **LangGraph** orchestrating a stateful sequential agent loop (*Parser Agent* $\rightarrow$ *Emissions Agent* $\rightarrow$ *Navigator Agent*).
* **Frontend UI:** Vanilla HTML5, JavaScript (ES6+ async/fetch), and Tailwind CSS for real-time telemetry streaming and dashboard rendering.

---

## 🛠️ Features & Implementation Updates

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

## 📦 Getting Started

The easiest way to get started with EcoTrace AI is by launching the local development environment bundled with the project. The layout sets up the following components:

* 🔑 **Environment Variables** (and API Keys)
* ⚙️ **Backend** (FastAPI & LangGraph orchestrating stateful agents)
* 🎨 **Frontend** (Vanilla HTML5 & Tailwind UI Dashboard)

### Prerequisites ☝️

Before you get started, please make sure you have the following installed:

* An editor of your choice. For example, [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
* [Python 3.10+](https://www.python.org/)
* Git

---

## 🚀 Getting Started Step-by-Step

### 1. Open your editor

### 2. Open the Terminal
Typically, you can do this from a 'Terminal' tab or by using a shortcut (e.g., `Ctrl + ~` for Windows or `Control + ~` for Mac in VS Code).

### 3. Clone the Repository and Navigate into the Directory
Once your terminal is open, you can clone the repository and move into the directory by running the commands below.

#### For Windows users 🪟
```bash
git clone [https://github.com/kannssq/EcoTrace-AI.git](https://github.com/kannssq/EcoTrace-AI.git)
cd EcoTrace-AI
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
