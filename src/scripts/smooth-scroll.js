/**
 * Smooth Scroll Navigation with UI Sound
 *
 * Handles smooth scrolling for navigation links (header & footer)
 * and plays a UI sound after the scroll animation completes.
 * Cross-browser compatible with custom easing animation.
 */

/**
 * Smooth scroll animation mit easing function
 * Cross-browser kompatibel (funktioniert auch in Safari/Firefox)
 */
const smoothScrollTo = (targetElement, duration = 600) => {
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function für smooth animation
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
  return duration;
};

/**
 * Initialisiert Smooth Scroll für Navigation-Links
 */
const initSmoothScroll = () => {
  // Hole Sound-Element (UI-Click-Sound)
  const scrollSound = new Audio('/audio/click-sound.wav');
  scrollSound.volume = 0.7; // Leiser Sound (70% Lautstärke)

  // Finde alle Navigation-Links (Header & Footer)
  // Unterstützt sowohl #anchor als auch /#anchor Format
  const navLinks = document.querySelectorAll('a[href^="#"], a[href^="/#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignoriere leere oder ungültige Hashes
      if (!href || href === '#' || href === '#!') return;

      // Prüfe ob der Link auf die gleiche Seite zeigt (mit oder ohne /)
      const targetHash = href.startsWith('/#') ? href.substring(2) : href.substring(1);

      // Nur Links mit Hash-Targets auf der gleichen Seite behandeln
      if (!targetHash) return;

      // Finde Ziel-Element
      const targetElement = document.getElementById(targetHash);

      // Wenn das Element nicht existiert (z.B. auf /privacy oder /terms),
      // erlaube normale Browser-Navigation zur Startseite
      if (!targetElement) {
        console.debug(`Target element with id "${targetHash}" not found - allowing default navigation`);
        return; // Kein preventDefault(), Browser navigiert normal
      }

      // Element existiert auf dieser Seite - verwende Smooth Scroll
      e.preventDefault();

      // Smooth Scroll zum Ziel mit custom animation (cross-browser)
      const duration = smoothScrollTo(targetElement, 600);

      // Spiele Sound nach Scroll-Animation
      setTimeout(() => {
        // Prüfe ob Sounds aktiviert sind
        const soundsEnabled = localStorage.getItem('sounds-enabled') !== 'false';

        if (soundsEnabled) {
          scrollSound.currentTime = 0;
          scrollSound.play().catch((err) => {
            console.debug('Sound konnte nicht abgespielt werden:', err);
          });
        }
      }, duration);

      // Aktualisiere URL (optional, ohne erneutes Scrollen)
      if (history.pushState) {
        history.pushState(null, null, href);
      } else {
        // Fallback für ältere Browser
        window.location.hash = href;
      }
    });
  });
};

/**
 * Auto-Initialisierung
 */
if (typeof document !== 'undefined') {
  // Initial Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }

  // Astro View Transitions Support
  document.addEventListener('astro:after-swap', initSmoothScroll);
  document.addEventListener('astro:page-load', initSmoothScroll);
}

export { initSmoothScroll };
