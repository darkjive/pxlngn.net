/**
 * Brand Tooltips Script
 * Handles mobile long-press tooltip display for brand logos
 * Desktop: tooltip shows on hover
 * Mobile: long-press (500ms) shows tooltip for 2 seconds, normal tap opens link
 */

export function initBrandTooltips() {
  const brandLinks = document.querySelectorAll('.brand-link');

  if (!brandLinks.length) return;

  brandLinks.forEach((link) => {
    let pressTimer;
    let longPressTriggered = false;
    const tooltip = link.querySelector('.brand-tooltip');

    if (!tooltip) return;

    const startPress = (e) => {
      longPressTriggered = false;
      pressTimer = setTimeout(() => {
        longPressTriggered = true;
        if (tooltip) {
          tooltip.classList.add('opacity-100', '!pointer-events-auto');
          tooltip.classList.remove('opacity-0');
        }
      }, 500); // 500ms for long press
    };

    const endPress = (e) => {
      clearTimeout(pressTimer);
      if (longPressTriggered) {
        e.preventDefault();
        setTimeout(() => {
          if (tooltip) {
            tooltip.classList.remove('opacity-100', '!pointer-events-auto');
            tooltip.classList.add('opacity-0');
          }
        }, 2000); // Hide after 2 seconds
      }
    };

    const cancelPress = () => {
      clearTimeout(pressTimer);
      if (tooltip) {
        tooltip.classList.remove('opacity-100', '!pointer-events-auto');
        tooltip.classList.add('opacity-0');
      }
    };

    // Touch events for mobile
    link.addEventListener('touchstart', startPress, { passive: false });
    link.addEventListener('touchend', endPress, { passive: false });
    link.addEventListener('touchmove', cancelPress, { passive: true });
    link.addEventListener('touchcancel', cancelPress, { passive: true });
  });
}
