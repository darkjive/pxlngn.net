/**
 * Scroll Handling
 *
 * Verwaltet scroll-basierte UI-Interaktionen:
 * - Header-Styling bei Scroll
 * - Auto-Hide Navigation (Mobile)
 * - Performance-optimiert mit requestAnimationFrame
 *
 * Features:
 * - Smooth Header-Transitions
 * - Mobile-spezifisches Auto-Hide
 * - Throttling für bessere Performance
 */

/**
 * Hilfs-Funktion zum Anhängen von Event-Listenern
 *
 * @param {string|NodeList} selector - CSS-Selector oder NodeList
 * @param {string} event - Event-Name
 * @param {Function} fn - Callback-Funktion
 */
function attachEvent(selector, event, fn) {
  const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (matches && matches.length) {
    matches.forEach((elem) => {
      elem.addEventListener(event, (e) => fn(e, elem), false);
    });
  }
}

/**
 * Initialisiert das Scroll-Handling-System
 *
 * Setup:
 * - Registriert Scroll-Event-Listener
 * - Implementiert Auto-Hide-Logik für Mobile
 * - Fügt Header-Styling-Classes hinzu
 *
 * @returns {void}
 */
export function initScrollHandling() {
  // Scroll-State-Tracking
  let lastScrollPosition = 0;
  const scrollThreshold = 10; // Minimale Scroll-Distanz bevor hide/show getriggert wird
  const scrollOffsetShow = 60; // Ab welcher Position die Navigation ausgeblendet werden kann

  /**
   * Wendet Header-Styles basierend auf Scroll-Position an
   *
   * Funktionen:
   * - Fügt 'scroll' class nach 60px hinzu (für Styling)
   * - Mobile: Auto-Hide beim Runterscrollen
   * - Desktop: Header immer sichtbar
   *
   * @returns {void}
   */
  function applyHeaderStylesOnScroll() {
    const header = document.querySelector('#header[data-aw-sticky-header]');
    if (!header) return;

    const currentScrollPosition = window.scrollY;

    // Standard scroll class für Header-Styling
    if (currentScrollPosition > 60 && !header.classList.contains('scroll')) {
      header.classList.add('scroll');
    } else if (currentScrollPosition <= 60 && header.classList.contains('scroll')) {
      header.classList.remove('scroll');
    }

    // Auto-Hide-Logik nur für mobile Geräte (unter 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Berechne Scroll-Richtung
      const scrollingDown = currentScrollPosition > lastScrollPosition;
      const scrollDifference = Math.abs(currentScrollPosition - lastScrollPosition);

      // Nur reagieren wenn genug gescrollt wurde
      if (scrollDifference < scrollThreshold) {
        return;
      }

      // Beim Runterscrollen (scrolling down = nach unten wischen): Header ausblenden
      if (scrollingDown && currentScrollPosition > scrollOffsetShow) {
        header.classList.add('header-hidden');
        header.classList.remove('header-visible');
      }
      // Beim Hochscrollen (scrolling up = nach oben wischen): Header einblenden
      else if (!scrollingDown) {
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
      }

      lastScrollPosition = currentScrollPosition;
    } else {
      // Auf Desktop: Header immer sichtbar
      header.classList.remove('header-hidden');
      header.classList.add('header-visible');
    }
  }

  /**
   * Initialisiert Scroll-Event-Listener mit requestAnimationFrame-Throttling
   *
   * Performance-Optimierung:
   * - Nutzt requestAnimationFrame statt direkter Event-Handler
   * - Verhindert Layout-Thrashing
   * - Throttling mit ticking-Flag
   *
   * @returns {void}
   */
  function initScrollEvents() {
    // Reset scroll position tracking
    lastScrollPosition = window.scrollY;

    let ticking = false;
    attachEvent([document], 'scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyHeaderStylesOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Starte Initialisierung
  initScrollEvents();
}
