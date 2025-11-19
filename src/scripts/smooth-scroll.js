/**
 * Smooth Scroll Navigation with UI Sound
 *
 * Handles smooth scrolling for navigation links (header & footer)
 * and plays a UI sound after the scroll animation completes.
 */

/**
 * Initialisiert Smooth Scroll für Navigation-Links
 */
const initSmoothScroll = () => {
  // Hole Sound-Element (UI-Click-Sound)
  const scrollSound = new Audio('/audio/615543__crash_358__sci-fi-ui-button-sound-019.wav');
  scrollSound.volume = 0.3; // Leiser Sound (30% Lautstärke)

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

      e.preventDefault();

      // Finde Ziel-Element
      const targetElement = document.getElementById(targetHash);

      if (!targetElement) {
        console.warn(`Target element with id "${targetHash}" not found`);
        return;
      }

      // Smooth Scroll zum Ziel
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });

      // Spiele Sound nach Scroll-Animation (ca. 600ms Verzögerung)
      setTimeout(() => {
        // Prüfe ob Sounds aktiviert sind
        const soundsEnabled = localStorage.getItem('sounds-enabled') !== 'false';

        if (soundsEnabled) {
          scrollSound.currentTime = 0;
          scrollSound.play().catch((err) => {
            console.debug('Sound konnte nicht abgespielt werden:', err);
          });
        }
      }, 600);

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
