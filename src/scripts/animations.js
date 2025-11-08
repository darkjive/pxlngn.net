/**
 * anime.js Animationen für pxlngn.net
 * Dezente Fade-In Animationen von außen nach innen
 * Kompatibel mit Astro View Transitions
 */

import { animate } from 'animejs';

// Konfiguration
const CONFIG = {
  duration: 800,
  ease: 'out(3)',
  offset: 0, // Pixel Versatz von außen
  threshold: 0.1, // Wieviel vom Element sichtbar sein muss
  rootMargin: '0px 0px -50px 0px',
  staggerDelay: 100, // Verzögerung zwischen Elementen
};

/**
 * Intersection Observer für Scroll-basierte Animationen
 */
const createObserver = () => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateElement(entry.target);
        }
      });
    },
    {
      threshold: CONFIG.threshold,
      rootMargin: CONFIG.rootMargin,
    }
  );
};

/**
 * Animiert ein einzelnes Element
 * @param {HTMLElement} element - Das zu animierende Element
 */
const animateElement = (element) => {
  // Bestimme Richtung basierend auf Position (optional)
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const isLeftSide = rect.left < viewportWidth / 2;

  animate(element, {
    opacity: [0, 1],
    translateY: [CONFIG.offset, 0],
    translateX: [isLeftSide ? -CONFIG.offset : CONFIG.offset, 0],
    scale: [0.95, 1],
    duration: CONFIG.duration,
    ease: CONFIG.ease,
  });
};

/**
 * Bereinigt Animations-States (wichtig für View Transitions)
 */
const resetAnimations = () => {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    delete el.dataset.animated;
    el.style.opacity = '';
  });
};

/**
 * Initialisiert alle Animationen
 */
let observer = null;

const initAnimations = () => {
  // Cleanup vorheriger Observer
  if (observer) {
    observer.disconnect();
  }

  // Setze initiale Styles für nicht-animierte Elemente
  document.querySelectorAll('[data-animate]:not([data-animated])').forEach((el) => {
    el.style.opacity = '0';
  });

  // Starte Observer für Scroll-Animationen
  // Animationen starten nur wenn Elemente in den Viewport gescrollt werden
  requestAnimationFrame(() => {
    observer = createObserver();
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  });
};

/**
 * Cleanup Funktion
 */
const cleanup = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

// Auto-Initialisierung
if (typeof document !== 'undefined') {
  // Initial Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Astro View Transitions Support
  document.addEventListener('astro:before-swap', () => {
    cleanup();
  });

  document.addEventListener('astro:after-swap', () => {
    resetAnimations();
    initAnimations();
  });

  // Fallback für astro:page-load (ältere Astro Versionen)
  document.addEventListener('astro:page-load', () => {
    initAnimations();
  });
}

// Exports für manuellen Gebrauch
export { initAnimations, animateElement, resetAnimations, cleanup };
