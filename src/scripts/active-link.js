/**
 * Active Link Highlighting
 *
 * Verwaltet die aktive Markierung von Navigationslinks:
 * - Markiert Links basierend auf aktueller Scroll-Position
 * - Reagiert auf Hash-Änderungen in der URL
 * - Verwendet Intersection Observer für Performance
 *
 * Features:
 * - Automatische Markierung beim Scrollen
 * - Unterstützung für Hash-Navigation
 * - Performance-optimiert mit Intersection Observer
 */

/**
 * Initialisiert das Active-Link-System
 *
 * Setup:
 * - Registriert Intersection Observer für Sections
 * - Registriert Hash-Change-Listener
 * - Initialisiert aktiven Link basierend auf URL
 *
 * @returns {void}
 */
export function initActiveLink() {
  // Alle Sections mit IDs finden
  const sections = document.querySelectorAll('section[id], div[id]');

  // Alle Navigationslinks finden
  const navLinks = document.querySelectorAll('#header nav a[href]');

  if (!sections.length || !navLinks.length) {
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
   * Intersection Observer Callback
   * Wird aufgerufen wenn eine Section in/out of view kommt
   *
   * @param {IntersectionObserverEntry[]} entries - Observer Entries
   */
  function handleIntersection(entries) {
    // Finde die Section, die am meisten im Viewport ist
    let mostVisibleSection = null;
    let maxRatio = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisibleSection = entry.target;
      }
    });

    // Wenn wir eine sichtbare Section haben, markiere den entsprechenden Link
    if (mostVisibleSection) {
      setActiveLink(mostVisibleSection.id);
    }
  }

  /**
   * Intersection Observer Setup
   *
   * Options:
   * - rootMargin: Trigger wenn Section 20% im Viewport ist
   * - threshold: Array von Schwellenwerten für granulare Erkennung
   */
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Top 20%, Bottom 70%
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Beobachte alle Sections
  sections.forEach(section => {
    observer.observe(section);
  });

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

  // Registriere Hash-Change-Listener
  window.addEventListener('hashchange', handleHashChange);

  // Initiale Aktivierung basierend auf aktuellem Hash oder erster Section
  const initialHash = window.location.hash.slice(1);
  if (initialHash) {
    setActiveLink(initialHash);
  } else if (sections.length > 0) {
    // Wenn kein Hash vorhanden, aktiviere die erste Section
    setActiveLink(sections[0].id);
  }
}
