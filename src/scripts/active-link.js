/**
 * Active Link Highlighting
 *
 * Verwaltet die aktive Markierung von Navigationslinks:
 * - Markiert Links basierend auf aktueller Scroll-Position
 * - Reagiert auf Hash-Änderungen in der URL
 * - Verwendet Scroll-basierte Erkennung für Zuverlässigkeit
 *
 * Features:
 * - Automatische Markierung beim Scrollen
 * - Unterstützung für Hash-Navigation
 * - Performance-optimiert mit requestAnimationFrame
 */

/**
 * Initialisiert das Active-Link-System
 *
 * Setup:
 * - Registriert Scroll-Event-Listener
 * - Registriert Hash-Change-Listener
 * - Initialisiert aktiven Link basierend auf URL
 *
 * @returns {void}
 */
export function initActiveLink() {
  // Alle Navigationslinks mit Hash-Links finden
  const navLinks = document.querySelectorAll('#header nav a[href*="#"]');

  if (!navLinks.length) {
    return;
  }

  // Sammle alle Section IDs aus den Links
  const sectionIds = new Set();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const hashMatch = href.match(/#(.+)$/);
      if (hashMatch) {
        sectionIds.add(hashMatch[1]);
      }
    }
  });

  // Finde alle entsprechenden Sections im DOM
  const sections = Array.from(sectionIds)
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

  if (!sections.length) {
    return;
  }

  /**
   * Entfernt die aktive Klasse von allen Links
   */
  function removeActiveFromAllLinks() {
    navLinks.forEach(link => {
      link.classList.remove('aw-link-active');
    });
  }

  /**
   * Setzt einen Link als aktiv basierend auf Section-ID
   *
   * @param {string} sectionId - ID der aktiven Section
   */
  function setActiveLink(sectionId) {
    if (!sectionId) return;

    removeActiveFromAllLinks();

    // Finde den passenden Link
    // Unterstützt sowohl /#section als auch #section Format
    const matchingLink = Array.from(navLinks).find(link => {
      const href = link.getAttribute('href');
      if (!href) return false;

      // Extrahiere Hash aus href (unterstützt /#section und #section)
      const hashMatch = href.match(/#(.+)$/);
      if (!hashMatch) return false;

      return hashMatch[1] === sectionId;
    });

    if (matchingLink) {
      matchingLink.classList.add('aw-link-active');
    }
  }

  /**
   * Findet die aktuell aktive Section basierend auf Scroll-Position
   * Verwendet die Section, die am nächsten zur Mitte des Viewports ist
   *
   * @returns {string|null} - ID der aktiven Section oder null
   */
  function findActiveSection() {
    const scrollPosition = window.scrollY;
    const viewportMiddle = scrollPosition + window.innerHeight / 2;

    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollPosition + rect.top;
      const sectionBottom = sectionTop + rect.height;
      const sectionMiddle = sectionTop + rect.height / 2;

      // Berechne Distanz zur Viewport-Mitte
      const distance = Math.abs(sectionMiddle - viewportMiddle);

      // Prüfe ob Section im Viewport ist
      const isInViewport = sectionBottom > scrollPosition && sectionTop < scrollPosition + window.innerHeight;

      // Wenn Section im Viewport ist und näher zur Mitte als die bisherige
      if (isInViewport && distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    return closestSection ? closestSection.id : null;
  }

  /**
   * Update-Funktion die beim Scrollen aufgerufen wird
   */
  function updateActiveLink() {
    const activeSectionId = findActiveSection();
    if (activeSectionId) {
      setActiveLink(activeSectionId);
    }
  }

  /**
   * Scroll-Handler mit requestAnimationFrame für Performance
   */
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Hash-Change Handler
   * Wird aufgerufen wenn sich der URL-Hash ändert (z.B. bei Klick auf Link)
   */
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Entferne '#'
    if (hash) {
      setActiveLink(hash);
    }
  }

  // Registriere Event-Listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('hashchange', handleHashChange);

  // Initiale Aktivierung basierend auf aktuellem Hash oder Scroll-Position
  const initialHash = window.location.hash.slice(1);
  if (initialHash) {
    setActiveLink(initialHash);
  } else {
    // Warte kurz bis Layout fertig ist, dann setze aktiven Link
    setTimeout(updateActiveLink, 100);
  }
}
