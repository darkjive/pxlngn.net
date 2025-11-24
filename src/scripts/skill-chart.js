/**
 * Skill Evolution Chart Initialization
 * Zeitbasierter Line-Chart der die Skill-Entwicklung über die berufliche Laufbahn zeigt
 */

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
// Date-Adapter für TimeScale
import 'chartjs-adapter-date-fns';
// Locale für deutsche Datumsformatierung
import { de } from 'date-fns/locale';

// Registriere benötigte Chart.js Komponenten
Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, Filler);

export function initSkillRadar() {
  const canvas = document.querySelector('[data-chart-type="tech"]');
  if (!canvas) return;

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  // Detect mobile/tablet for responsive sizing
  const isMobile = window.innerWidth <= 640;
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 640;

  // Set explicit canvas height BEFORE Chart.js initialization to prevent Firefox animation
  const aspectRatio = isMobile ? 1 : isTablet ? 1.5 : 2;
  const canvasWidth = canvas.parentElement.clientWidth;
  const explicitHeight = canvasWidth / aspectRatio;
  canvas.style.height = `${explicitHeight}px`;
  canvas.width = canvasWidth;
  canvas.height = explicitHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Finde den Loader
  const loader = document.querySelector('[data-skill-radar-loader]');
  const skeleton = loader?.querySelector('[data-futuristic-skeleton]');

  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Responsive font sizes
  const fontSize = {
    title: isMobile ? 12 : isTablet ? 14 : 16,
    tick: isMobile ? 11 : isTablet ? 13 : 16,
    legend: isMobile ? 14 : isTablet ? 16 : 20,
    tooltipTitle: isMobile ? 12 : isTablet ? 13 : 14,
    tooltipBody: isMobile ? 11 : isTablet ? 12 : 13,
  };

  // Responsive spacing
  const spacing = {
    legendPadding: isMobile ? 12 : isTablet ? 20 : 30,
    legendMargin: isMobile ? 10 : isTablet ? 20 : 30,
  };

  // Color scheme based on theme
  const colors = {
    frontend: {
      line: isDarkMode ? 'rgba(6, 182, 212, 1)' : 'rgba(14, 165, 233, 1)', // cyan-500 / sky-500
      fill: isDarkMode ? 'rgba(6, 182, 212, 0.1)' : 'rgba(14, 165, 233, 0.1)',
    },
    backend: {
      line: isDarkMode ? 'rgba(139, 92, 246, 1)' : 'rgba(124, 58, 237, 1)', // violet-500 / violet-600
      fill: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)',
    },
    design: {
      line: isDarkMode ? 'rgba(236, 72, 153, 1)' : 'rgba(219, 39, 119, 1)', // pink-500 / pink-600
      fill: isDarkMode ? 'rgba(236, 72, 153, 0.1)' : 'rgba(219, 39, 119, 0.1)',
    },
    pm: {
      line: isDarkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(245, 158, 11, 1)', // amber-400 / amber-500
      fill: isDarkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    },
    leadership: {
      line: isDarkMode ? 'rgba(239, 68, 68, 1)' : 'rgba(220, 38, 38, 1)', // red-500 / red-600
      fill: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.1)',
    },
    gridColor: isDarkMode ? 'rgba(156, 163, 175, 0.2)' : 'rgba(107, 114, 128, 0.2)',
    textColor: isDarkMode ? 'rgba(229, 231, 235, 1)' : 'rgba(31, 41, 55, 1)',
    pointBorder: isDarkMode ? '#fff' : '#1f2937',
    tooltipBg: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  };

  // Skill-Entwicklung über Zeit (basierend auf Lebenslauf)
  const skillEvolution = {
    datasets: [
      {
        label: 'Frontend Development',
        description: 'HTML, CSS, JavaScript, TypeScript, React, Angular',
        data: [
          { x: new Date('2003-01-01'), y: 10 },
          { x: new Date('2007-01-01'), y: 30 },
          { x: new Date('2010-01-01'), y: 50 },
          { x: new Date('2014-01-01'), y: 80 },
          { x: new Date('2016-01-01'), y: 85 },
          { x: new Date('2020-01-01'), y: 85 },
          { x: new Date('2025-01-01'), y: 95 },
        ],
        borderColor: colors.frontend.line,
        backgroundColor: colors.frontend.fill,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.frontend.line,
        pointBorderColor: colors.pointBorder,
        pointBorderWidth: 2,
      },
      {
        label: 'Backend Development',
        description: 'PHP, Node.js, Datenbanken, APIs',
        data: [
          { x: new Date('2003-01-01'), y: 5 },
          { x: new Date('2007-01-01'), y: 15 },
          { x: new Date('2010-01-01'), y: 40 },
          { x: new Date('2014-01-01'), y: 50 },
          { x: new Date('2016-01-01'), y: 55 },
          { x: new Date('2020-01-01'), y: 50 },
          { x: new Date('2025-01-01'), y: 60 },
        ],
        borderColor: colors.backend.line,
        backgroundColor: colors.backend.fill,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBackgroundColor: colors.backend.line,
        pointBorderColor: colors.pointBorder,
        pointBorderWidth: 1,
      },
      {
        label: 'Design & UX',
        description: 'Webdesign, UI/UX, Photoshop, Illustrator',
        data: [
          { x: new Date('2003-01-01'), y: 30 },
          { x: new Date('2007-01-01'), y: 70 },
          { x: new Date('2010-01-01'), y: 90 },
          { x: new Date('2014-01-01'), y: 60 },
          { x: new Date('2016-01-01'), y: 50 },
          { x: new Date('2020-01-01'), y: 40 },
          { x: new Date('2025-01-01'), y: 70 },
        ],
        borderColor: colors.design.line,
        backgroundColor: colors.design.fill,
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.design.line,
        pointBorderColor: colors.pointBorder,
        pointBorderWidth: 2,
      },
      {
        label: 'Project Management',
        description: 'Scrum Master, Projektleitung, Agile Methoden',
        data: [
          { x: new Date('2003-01-01'), y: 5 },
          { x: new Date('2007-01-01'), y: 10 },
          { x: new Date('2010-01-01'), y: 15 },
          { x: new Date('2014-01-01'), y: 30 },
          { x: new Date('2016-01-01'), y: 50 },
          { x: new Date('2020-01-01'), y: 90 },
          { x: new Date('2025-01-01'), y: 40 },
        ],
        borderColor: colors.pm.line,
        backgroundColor: colors.pm.fill,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.pm.line,
        pointBorderColor: colors.pointBorder,
        pointBorderWidth: 2,
      },
      {
        label: 'Team Leadership',
        description: 'Teamleitung, Kommunikation, Servant Leadership',
        data: [
          { x: new Date('2003-01-01'), y: 5 },
          { x: new Date('2007-01-01'), y: 10 },
          { x: new Date('2010-01-01'), y: 15 },
          { x: new Date('2014-01-01'), y: 25 },
          { x: new Date('2016-01-01'), y: 40 },
          { x: new Date('2020-01-01'), y: 70 },
          { x: new Date('2025-01-01'), y: 75 },
        ],
        borderColor: colors.leadership.line,
        backgroundColor: colors.leadership.fill,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.leadership.line,
        pointBorderColor: colors.pointBorder,
        pointBorderWidth: 2,
      },
    ],
  };

  // Get hover sound for interaction
  const soundHover = document.getElementById('sound-hover');
  let lastHoveredIndex = null;

  // Chart configuration
  const config = {
    type: 'line',
    data: skillEvolution,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: isMobile ? 1 : isTablet ? 1.5 : 2,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      animation: false,
      onHover: (event, activeElements) => {
        // Play sound on hover
        if (activeElements.length > 0) {
          const currentIndex = activeElements[0].index;
          if (currentIndex !== lastHoveredIndex) {
            lastHoveredIndex = currentIndex;
            // Play sound if enabled
            const soundsEnabled = localStorage.getItem('sounds-enabled') !== 'false';
            if (soundHover && soundsEnabled) {
              soundHover.currentTime = 0;
              soundHover.play().catch(() => {});
            }
          }
        } else {
          lastHoveredIndex = null;
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'year',
            tooltipFormat: 'yyyy',
            displayFormats: {
              year: 'yyyy',
            },
          },
          adapters: {
            date: {
              locale: de,
            },
          },
          title: {
            display: true,
            text: 'Berufliche Laufbahn',
            color: colors.textColor,
            font: {
              size: fontSize.title,
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
              weight: 'normal',
            },
          },
          grid: {
            color: colors.gridColor,
            lineWidth: 1,
          },
          ticks: {
            color: colors.textColor,
            font: {
              size: fontSize.tick,
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
            },
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          min: 0,
          title: {
            display: true,
            text: isMobile ? 'Level (0-100)' : 'Erfahrungslevel (0-100)',
            color: colors.textColor,
            font: {
              size: fontSize.title,
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
              weight: 'normal',
            },
          },
          grid: {
            color: colors.gridColor,
            lineWidth: 1,
          },
          ticks: {
            color: colors.textColor,
            stepSize: 20,
            font: {
              size: fontSize.tick,
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            color: colors.textColor,
            font: {
              size: fontSize.legend,
              weight: 'normal',
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
            },
            padding: spacing.legendPadding,
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: colors.tooltipBg,
          titleColor: colors.textColor,
          bodyColor: colors.textColor,
          borderColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(107, 114, 128, 0.5)',
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          cornerRadius: 8,
          titleFont: {
            size: fontSize.tooltipTitle,
            weight: '600',
            family: "'Baloo Bhaijaan 2 Variable', sans-serif",
          },
          bodyFont: {
            size: fontSize.tooltipBody,
            weight: '300',
            family: "'Baloo Bhaijaan 2 Variable', sans-serif",
          },
          titleMarginBottom: 12,
          bodySpacing: 8,
          callbacks: {
            title: function (context) {
              // Zeige das Jahr
              const date = new Date(context[0].parsed.x);
              return date.getFullYear();
            },
            label: function (context) {
              const dataset = context.dataset;
              const value = context.parsed.y;
              const description = dataset.description || '';

              // Zeige Skill-Name, Level und Beschreibung
              return [`${dataset.label}: ${value}/100`, description ? `  ${description}` : ''];
            },
          },
        },
      },
    },
  };

  // Create chart
  new Chart(ctx, config);

  // Verstecke Loader sofort (ohne Chart-Animation)
  if (skeleton) {
    skeleton.classList.add('loaded');
  }
  // Kurze Verzögerung für visuellen Effekt
  setTimeout(() => {
    if (loader) {
      loader.classList.add('loaded');
    }
  }, 100);
}

// Global theme observer (only initialize once)
let themeObserverInitialized = false;

if (!themeObserverInitialized) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Reinitialize chart with new theme
        setTimeout(initSkillRadar, 50);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  themeObserverInitialized = true;
}

// Handle window resize for responsive chart
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initSkillRadar();
  }, 250);
});
