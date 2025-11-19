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

  // Finde den Loader
  const loader = document.querySelector('[data-skill-radar-loader]');
  const skeleton = loader?.querySelector('[data-futuristic-skeleton]');

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
    tooltipBg: isDarkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  };

  // Skills categories
  const labels = [
    'Frontend', // 1
    'JavaScript', // 2
    'TypeScript', // 3
    'Frameworks', // 4
    'Backend', // 5
    'Git/DevOps', // 6
    'Testing', // 7
    'Design', // 8
    'Management', // 9
    'Kommunikation', // 10
  ];

  // Year 2000 - Beginner (10 points)
  const data2000 = [10, 5, 5, 5, 10, 10, 5, 60, 10, 30];

  // Year 2010 - Growing (10 points)
  const data2010 = [70, 20, 10, 40, 20, 30, 40, 80, 30, 60];

  // Year 2025 - Current (10 points)
  const data2025 = [90, 60, 40, 80, 50, 60, 70, 40, 60, 70];

  const skillData = {
    labels: labels,
    datasets: [
      {
        label: ' (Jahr 2000)',
        data: data2000,
        backgroundColor: colors.y2000.primaryAlpha,
        borderColor: colors.y2000.primary,
        borderWidth: 1,
        pointBackgroundColor: colors.y2000.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.y2000.primary,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: ' (Jahr 2010)',
        data: data2010,
        backgroundColor: colors.y2010.primaryAlpha,
        borderColor: colors.y2010.primary,
        borderWidth: 1,
        pointBackgroundColor: colors.y2010.primary,
        pointBorderColor: colors.pointBorder,
        pointHoverBackgroundColor: colors.pointBorder,
        pointHoverBorderColor: colors.y2010.primary,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: ' (Jahr 2025)',
        data: data2025,
        backgroundColor: colors.y2025.primaryAlpha,
        borderColor: colors.y2025.primary,
        borderWidth: 1,
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
        duration: 500,
        easing: 'easeInOutQuart',
        onComplete: () => {
          // Verstecke Loader nach Chart-Animation
          if (skeleton) {
            skeleton.classList.add('loaded');
          }
          setTimeout(() => {
            if (loader) {
              loader.classList.add('loaded');
            }
          }, 600);
        },
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
            stepSize: 10,
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
            lineWidth: 1,
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
              weight: 'normal',
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
          borderWidth: 1,
          padding: 20,
          displayColors: false,
          cornerRadius: 8,
          titleFont: {
            size: 18,
            weight: 'normal',
            family: "'Baloo Bhaijaan 2 Variable', sans-serif",
          },
          bodyFont: {
            size: 28,
            weight: 'normal',
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
