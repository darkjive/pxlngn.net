/**
 * Skill Radar Chart Initialization
 * Initializes Chart.js radar chart for skill visualization with two datasets
 */

/* global Chart */

export function initSkillRadar() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet, retrying...');
    setTimeout(initSkillRadar, 100);
    return;
  }

  const canvas = document.querySelector('[data-chart-type="tech"]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Color scheme based on theme - Three decades
  const colors = {
    y2000: {
      primary: isDarkMode ? 'rgba(239, 68, 68, 1)' : 'rgba(220, 38, 38, 1)', // red-500 / red-600
      primaryAlpha: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(220, 38, 38, 0.15)',
    },
    y2010: {
      primary: isDarkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(245, 158, 11, 1)', // amber-400 / amber-500
      primaryAlpha: isDarkMode ? 'rgba(251, 191, 36, 0.15)' : 'rgba(245, 158, 11, 0.15)',
    },
    y2025: {
      primary: isDarkMode ? 'rgba(6, 182, 212, 1)' : 'rgba(14, 165, 233, 1)', // cyan-500 / sky-500
      primaryAlpha: isDarkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(14, 165, 233, 0.2)',
    },
    gridColor: isDarkMode ? 'rgba(156, 163, 175, 0.6)' : 'rgba(107, 114, 128, 0.6)',
    textColor: isDarkMode ? 'rgba(229, 231, 235, 1)' : 'rgba(31, 41, 55, 1)',
    pointBorder: isDarkMode ? '#fff' : '#1f2937',
    tooltipBg: isDarkMode ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
  };

  // Skills categories
  const labels = [
    'Frontend',
    'JavaScript',
    'TypeScript',
    'Frameworks',
    'Backend',
    'Git/DevOps',
    'Testing',
    'Design',
    'Management',
    'Kommunikation',
  ];

  // Year 2000 - Beginner (10 points)
  const data2000 = [30, 25, 0, 10, 15, 20, 10, 35, 5, 30];

  // Year 2010 - Growing (10 points)
  const data2010 = [70, 65, 30, 55, 45, 60, 40, 70, 35, 60];

  // Year 2025 - Current (10 points)
  const data2025 = [95, 85, 75, 85, 65, 80, 70, 85, 60, 75];

  const skillData = {
    labels: labels,
    datasets: [
      {
        label: '2000',
        data: data2000,
        backgroundColor: colors.y2000.primaryAlpha,
        borderColor: colors.y2000.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.y2000.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.y2000.primary,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
      {
        label: '2010',
        data: data2010,
        backgroundColor: colors.y2010.primaryAlpha,
        borderColor: colors.y2010.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.y2010.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.y2010.primary,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
      {
        label: '2025',
        data: data2025,
        backgroundColor: colors.y2025.primaryAlpha,
        borderColor: colors.y2025.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.y2025.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.y2025.primary,
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
            display: false,
            stepSize: 5,
            backdropColor: 'transparent',
          },
          grid: {
            color: colors.gridColor,
            circular: true,
            lineWidth: 1,
          },
          pointLabels: {
            display: true,
            color: isDarkMode ? 'rgba(156, 163, 175, 1)' : 'rgba(107, 114, 128, 1)', // text-muted
            font: {
              size: 12, // text-xs
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
              weight: 'normal',
            },
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
          display: true,
          position: 'top',
          labels: {
            color: colors.textColor,
            font: {
              size: 16,
              weight: 'bold',
              family: "'Baloo Bhaijaan 2 Variable', sans-serif",
            },
            padding: 20,
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
          borderWidth: 2,
          padding: 20,
          displayColors: true,
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
              // Show value without percent sign
              return context.dataset.label + ': ' + context.parsed.r;
            },
          },
        },
      },
    },
  };

  // Create chart
  new Chart(ctx, config);
}

// Global theme observer (only initialize once)
let themeObserverInitialized = false;

if (!themeObserverInitialized) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Destroy existing chart and reinitialize
        const canvas = document.querySelector('[data-chart-type="tech"]');
        if (canvas) {
          const existingChart = Chart.getChart(canvas);
          if (existingChart) {
            existingChart.destroy();
          }
        }
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
