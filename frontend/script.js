document.addEventListener('DOMContentLoaded', () => {
  const auditBtn = document.getElementById('audit-btn');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const documentsInput = document.getElementById('documents-input');
  const consoleLogs = document.getElementById('console-logs');
  const clearConsoleBtn = document.getElementById('clear-console');
  
  const overviewPanel = document.getElementById('overview-panel');
  const co2Value = document.getElementById('co2-value');
  const efficiencyValue = document.getElementById('efficiency-value');
  const offsetValue = document.getElementById('offset-value');
  
  const resultsPanel = document.getElementById('results-panel');
  const emptyState = document.getElementById('empty-state');
  const routeCardsContainer = document.getElementById('route-cards-container');

  // Helper to log messages to terminal console
  function logToConsole(message, type = 'system') {
    const timestamp = new Date().toLocaleTimeString();
    let prefix = '[SYSTEM]';
    let colorClass = 'text-slate-400';

    if (type === 'parser') {
      prefix = '[PARSER_AGENT]';
      colorClass = 'text-cyan-400';
    } else if (type === 'emissions') {
      prefix = '[EMISSIONS_AGENT]';
      colorClass = 'text-yellow-500';
    } else if (type === 'navigator') {
      prefix = '[NAVIGATOR_AGENT]';
      colorClass = 'text-emerald-400';
    } else if (type === 'error') {
      prefix = '[ERROR]';
      colorClass = 'text-red-500 font-bold';
    } else if (type === 'info') {
      prefix = '[INFO]';
      colorClass = 'text-slate-300';
    }

    const logLine = document.createElement('div');
    logLine.className = `${colorClass} transition-opacity duration-300`;
    logLine.innerHTML = `<span class="text-slate-600 font-medium">[${timestamp}]</span> <span class="font-bold">${prefix}</span> ${message}`;
    consoleLogs.appendChild(logLine);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
  }

  // Clear console function
  clearConsoleBtn.addEventListener('click', () => {
    consoleLogs.innerHTML = '<div class="text-slate-500 italic">[System Status: Console Cleared]</div>';
  });

  // Helper to animate count up
  function animateCount(element, startValue, targetValue, duration = 1200, isFloat = false, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = startValue + ease * (targetValue - startValue);
      if (isFloat) {
        element.textContent = `${current.toFixed(1)}${suffix}`;
      } else {
        element.textContent = `${Math.floor(current)}${suffix}`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isFloat) {
          element.textContent = `${targetValue.toFixed(1)}${suffix}`;
        } else {
          element.textContent = `${targetValue}${suffix}`;
        }
      }
    }
    
    requestAnimationFrame(update);
  }

  // Main click interaction
  auditBtn.addEventListener('click', async () => {
    // 1. Process documents input
    const docsText = documentsInput.value.trim();
    if (!docsText) {
      alert('Please enter at least one document name for the audit.');
      return;
    }
    const documentsList = docsText.split('\n').map(d => d.trim()).filter(d => d !== '');

    // 2. Disable UI during processing
    auditBtn.disabled = true;
    auditBtn.classList.add('opacity-75', 'cursor-not-allowed');
    btnText.textContent = 'Auditing Pipeline...';
    btnIcon.classList.add('animate-spin');

    // Reset console and UI states
    consoleLogs.innerHTML = '';
    overviewPanel.classList.add('hidden');
    routeCardsContainer.classList.add('hidden');
    routeCardsContainer.innerHTML = '';
    emptyState.classList.remove('hidden');

    // 3. Step-by-step console logging simulation alongside the actual API call
    logToConsole('Initializing multi-agent routing audit graph workflow...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    logToConsole(`Analyzing input corpus containing ${documentsList.length} documents.`, 'info');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    logToConsole('Invoking graph node [parse_documents]...', 'parser');

    try {
      // 4. Send API POST Request
      const response = await fetch('http://127.0.0.1:8000/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ documents: documentsList })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Simulated delays to allow the user to read the agent progress steps
      await new Promise(resolve => setTimeout(resolve, 600));
      const parsedInfo = data.parsed_data || {};
      logToConsole(`Document parsing complete. Status: ${parsedInfo.status}. Info: ${parsedInfo.details}`, 'parser');

      await new Promise(resolve => setTimeout(resolve, 800));
      logToConsole('Invoking graph node [calculate_emissions]...', 'emissions');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      const emissionsInfo = data.emissions || {};
      logToConsole(`Emissions calculated. CO2: ${emissionsInfo.co2_tons} Tons. Audit score: ${emissionsInfo.efficiency_score}%`, 'emissions');

      await new Promise(resolve => setTimeout(resolve, 800));
      logToConsole('Invoking graph node [route_navigator]...', 'navigator');

      await new Promise(resolve => setTimeout(resolve, 800));
      const routes = data.routes || [];
      logToConsole(`Routing analysis completed. Found ${routes.length} routing alternatives.`, 'navigator');
      
      await new Promise(resolve => setTimeout(resolve, 400));
      logToConsole('Compiling final state and rendering dashboard panels.', 'system');

      // 5. Update and render UI with results
      overviewPanel.classList.remove('hidden');
      
      const targetCO2 = emissionsInfo.co2_tons || 0;
      const targetEfficiency = emissionsInfo.efficiency_score || 0;
      const targetTrees = Math.round(targetCO2 * 45);

      animateCount(co2Value, 0, targetCO2, 1200, true, ' Tons');
      animateCount(efficiencyValue, 0, targetEfficiency, 1200, false, '%');
      animateCount(offsetValue, 0, targetTrees, 1200, false, ' Trees');

      // Render cards
      emptyState.classList.add('hidden');
      routeCardsContainer.classList.remove('hidden');

      routes.forEach((route, index) => {
        const color = route.color; // e.g. '#e53e3eff' or '#38a169'
        const routeCard = document.createElement('div');
        
        // Premium border style utilizing inline styling for the exact Hex colors
        routeCard.className = `p-6 bg-slate-950/40 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.01] hover:bg-slate-950/60 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-0 transform translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]`;
        routeCard.style.borderColor = color;
        routeCard.style.animationDelay = `${index * 200}ms`;

        routeCard.innerHTML = `
          <div class="flex-grow space-y-2">
            <div class="flex flex-wrap items-center gap-2.5">
              <h4 class="text-base font-bold text-white tracking-wide">${route.name}</h4>
              <span class="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border" 
                    style="background-color: ${color}15; color: ${color}; border-color: ${color}30;">
                ${route.congestion_level} congestion
              </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed max-w-xl">${route.description}</p>
          </div>
          <div class="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 border-slate-900 pt-3 md:pt-0 shrink-0">
            <div class="text-left md:text-right">
              <span class="text-slate-500 block uppercase tracking-wider font-semibold text-[9px]">Distance</span>
              <span class="text-slate-200 font-bold text-base">${route.distance_km} km</span>
            </div>
            <div class="text-left md:text-right">
              <span class="text-slate-500 block uppercase tracking-wider font-semibold text-[9px]">Est. Time</span>
              <span class="text-slate-200 font-bold text-base">${route.estimated_time_mins} mins</span>
            </div>
          </div>
        `;
        
        routeCardsContainer.appendChild(routeCard);
      });

    } catch (error) {
      console.error(error);
      logToConsole(`Failed to fetch audit details from API. Make sure the backend FastAPI service is running. Error: ${error.message}`, 'error');
    } finally {
      // 6. Reset button state
      auditBtn.disabled = false;
      auditBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      btnText.textContent = 'Run Multi-Agent Audit';
      btnIcon.classList.remove('animate-spin');
    }
  });
});

// Dynamic animations styles injected into document head for dynamic route card fade-in
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);
