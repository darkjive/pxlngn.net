/**
 * Skill Radar Chart Initialization
 * Initializes Chart.js radar chart for skill visualization
 */

/* global Chart */

export function initSkillRadar() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet, retrying...');
    setTimeout(initSkillRadar, 100);
    return;
  }

  const canvas = document.getElementById('skillRadarChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Color scheme based on theme
  const colors = {
    primary: isDarkMode ? 'rgba(6, 182, 212, 1)' : 'rgba(14, 165, 233, 1)', // cyan-500 / sky-500
    primaryAlpha: isDarkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(14, 165, 233, 0.2)',
    gridColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)', // gray-600 / gray-300
    textColor: isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'rgba(31, 41, 55, 0.9)', // gray-200 / gray-800
    tickColor: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)', // gray-400 / gray-500
    pointBorder: isDarkMode ? '#fff' : '#1f2937',
  };

  // Expanded skill data with multiple categories
  const skillData = {
    labels: [
      'Frontend\nDevelopment',
      'JavaScript/\nTypeScript',
      'CSS / SCSS',
      'Projektleitung',
      'Scrum Master',
      'Team\nLeadership',
      'QA & Testing',
      'UI/UX\nDesign',
      'Soft Skills',
    ],
    datasets: [
      {
        label: 'Skill Level',
        data: [
          99, // Frontend Development
          60, // JavaScript/TypeScript
          60, // JavaScript/TypeScript
          20, // Projektleitung
          40, // Scrum Master
          50, // Team Leadership
          30, // QA & Testing
          60, // UI/UX Design
          90, // Soft Skills (Kommunikation, Problemlösung, Engagement)
        ],
        backgroundColor: colors.primaryAlpha,
        borderColor: colors.primary,
        borderWidth: 1,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.primary,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart configuration
  const config = {
    type: 'radar',
    data: skillData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart',
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            display: true, // Hide tick numbers
            stepSize: 20,
            backdropColor: 'transparent',
          },
          grid: {
            color: colors.gridColor,
            circular: true,
            lineWidth: 2,
          },
          pointLabels: {
            color: colors.textColor,
            font: { size: 20 },
            padding: 15,
          },
          angleLines: {
            color: colors.gridColor,
            lineWidth: 2,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          titleColor: colors.primary,
          bodyColor: colors.textColor,
          borderColor: colors.primary,
          borderWidth: 2,
          padding: 16,
          displayColors: false,
          titleFont: {
            size: 20,
          },
          bodyFont: { size: 20 },
          callbacks: {
            label: function () {
              return ''; // No label text
            },
            title: function (context) {
              // Only show skill name
              return context[0].label.replace(/\n/g, ' ');
            },
          },
        },
      },
    },
  };

  // Create chart
  new Chart(ctx, config);

  // Listen for theme changes and recreate chart
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Destroy existing chart and reinitialize
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
          existingChart.destroy();
        }
        setTimeout(initSkillRadar, 50);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}
