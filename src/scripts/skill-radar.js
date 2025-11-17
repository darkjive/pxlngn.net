/**
 * Skill Radar Chart Initialization
 * Initializes Chart.js radar chart for skill visualization
 */

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

  // Skill data
  const skillData = {
    labels: ['Frontend', 'Projektleitung', 'Scrum Master', 'Designer'],
    datasets: [
      {
        label: 'Skills',
        data: [65, 5, 10, 20],
        backgroundColor: 'rgba(6, 182, 212, 0.2)', // cyan with opacity
        borderColor: 'rgba(6, 182, 212, 1)', // cyan
        borderWidth: 2,
        pointBackgroundColor: 'rgba(6, 182, 212, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(6, 182, 212, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
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
            stepSize: 20,
            color: 'rgba(156, 163, 175, 0.8)', // gray-400
            backdropColor: 'transparent',
            font: {
              size: 12,
            },
          },
          grid: {
            color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
            circular: true,
          },
          pointLabels: {
            color: 'rgba(229, 231, 235, 0.9)', // gray-200
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          angleLines: {
            color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900
          titleColor: 'rgba(6, 182, 212, 1)', // cyan
          bodyColor: 'rgba(229, 231, 235, 1)', // gray-200
          borderColor: 'rgba(6, 182, 212, 0.5)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return context.parsed.r + '%';
            },
          },
        },
      },
    },
  };

  // Create chart
  new Chart(ctx, config);
}
