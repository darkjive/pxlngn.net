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
    primaryAlpha: isDarkMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(14, 165, 233, 0.3)',
    gridColor: isDarkMode ? 'rgba(156, 163, 175, 0.6)' : 'rgba(107, 114, 128, 0.6)', // More contrast
    textColor: isDarkMode ? 'rgba(229, 231, 235, 1)' : 'rgba(31, 41, 55, 1)',
    tickColor: isDarkMode ? 'rgba(156, 163, 175, 1)' : 'rgba(107, 114, 128, 1)',
    pointBorder: isDarkMode ? '#fff' : '#1f2937',
    tooltipBg: isDarkMode ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
    tooltipBorder: isDarkMode ? 'rgba(6, 182, 212, 1)' : 'rgba(14, 165, 233, 1)',
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
          90, // Frontend Development
          60, // JavaScript/TypeScript
          60, // CSS / SCSS
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

  // Get hover sound for interaction
  const soundHover = document.getElementById('sound-hover');
  let lastHoveredIndex = null;

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
      onHover: (event, activeElements) => {
        // Play sound on node hover
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
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            display: false, // Hide tick numbers
            stepSize: 20,
            backdropColor: 'transparent',
          },
          grid: {
            color: colors.gridColor,
            circular: true,
            lineWidth: 2,
          },
          pointLabels: {
            display: false, // Hide labels
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
          enabled: true,
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipBorder,
          bodyColor: colors.textColor,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          padding: 20,
          displayColors: false,
          cornerRadius: 8,
          titleFont: {
            size: 18,
            weight: 'bold',
            family: "'Baloo Bhaijaan 2 Variable', sans-serif",
          },
          bodyFont: {
            size: 28,
            weight: 'bold',
            family: "'Baloo Bhaijaan 2 Variable', sans-serif",
          },
          titleMarginBottom: 12,
          bodySpacing: 8,
          callbacks: {
            title: function (context) {
              // Show skill name
              return context[0].label.replace(/\n/g, ' ');
            },
            label: function (context) {
              // Show percentage value with styling
              return context.parsed.r + '%';
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
