/**
 * Animation System mit anime.js v4
 *
 * Verantwortlich für alle Scroll-basierten und einmaligen Animationen auf der Seite.
 * Nutzt IntersectionObserver für performante Scroll-Detection.
 *
 * @see https://animejs.com - anime.js v4 Dokumentation
 */

import { animate } from 'animejs';

/**
 * Globale Animations-Konfiguration
 *
 * @property {number} duration - Standard-Dauer für Animationen in Millisekunden (600ms = 0.6s)
 * @property {string} easing - Standard-Easing-Funktion für weiche Animationen (out-expo = schneller Start, langsamer Ende)
 * @property {number} offset - Pixel-Offset für Translate-Animationen (40px Bewegungsdistanz)
 * @property {number} threshold - Sichtbarkeits-Schwellwert für IntersectionObserver (0.15 = 15% des Elements muss sichtbar sein)
 * @property {string} rootMargin - Zusätzlicher Rand für frühere/spätere Trigger ('0px' = exakt bei Sichtbarkeit)
 */
const CONFIG = {
  duration: 450,
  easing: 'outInCirc',
  offset: 50,
  threshold: 0.15,
  rootMargin: '0px',
};

/**
 * Globale Instanzen
 * @type {IntersectionObserver|null} observer - IntersectionObserver für Scroll-Animationen
 * @type {object|null} typewriterInstance - Aktuell laufende Typewriter-Animation (Reserved für zukünftige Nutzung)
 */
let observer = null;
let typewriterInstance = null;

/**
 * Animiert ein Element basierend auf data-anim-type Attribut
 *
 * Verwendung im HTML:
 * <div data-animate data-anim-type="fade-up" data-anim-delay="200">Content</div>
 *
 * @param {HTMLElement} element - Das zu animierende Element
 * @returns {void}
 */
const animateElement = (element) => {
  // Verhindere doppelte Animationen
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  // Lese Animation-Type und Verzögerung aus data-Attributen
  const animType = element.dataset.animType || 'default';
  const delay = parseInt(element.dataset.animDelay || '0');

  /**
   * Verfügbare Animations-Typen
   * Jeder Type definiert opacity, transform und timing für verschiedene Effekte
   */
  const animations = {
    'fade-up': {
      opacity: [0, 1],
      translateY: [CONFIG.offset, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
    'fade-down': {
      opacity: [0, 1],
      translateY: [-CONFIG.offset, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
    'fade-left': {
      opacity: [0, 1],
      translateX: [CONFIG.offset, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
    'fade-right': {
      opacity: [0, 1],
      translateX: [-CONFIG.offset, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
    'logo-slide': {
      opacity: [0, 1],
      translateX: [100, 0],
      duration: CONFIG.duration,
      ease: 'out-elastic(1, .6)',
      delay: 0,
    },
    'scale-up': {
      opacity: [0, 1],
      scale: [0.1, 1],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
    glitch: {
      opacity: [0, 1],
      duration: 400,
      ease: 'out-quad',
      delay,
      onComplete: () => {
        // Verstärkte Glitch-Animation mit größeren Bewegungen
        const glitchAnim = animate(element, {
          translateX: [
            { to: -12, duration: 80 },
            { to: 15, duration: 80 },
            { to: -8, duration: 80 },
            { to: 10, duration: 80 },
            { to: -5, duration: 80 },
            { to: 0, duration: 120 },
          ],
          translateY: [
            { to: 3, duration: 80 },
            { to: -4, duration: 80 },
            { to: 2, duration: 80 },
            { to: -3, duration: 80 },
            { to: 1, duration: 80 },
            { to: 0, duration: 120 },
          ],
          skewX: [
            { to: 2, duration: 80 },
            { to: -3, duration: 80 },
            { to: 1, duration: 80 },
            { to: -2, duration: 80 },
            { to: 1, duration: 80 },
            { to: 0, duration: 120 },
          ],
          opacity: [
            { to: 0.85, duration: 80 },
            { to: 1, duration: 80 },
            { to: 0.9, duration: 80 },
            { to: 0.95, duration: 80 },
            { to: 1, duration: 240 },
          ],
          ease: 'linear',
          loop: true,
        });

        element.addEventListener('mouseenter', () => glitchAnim.pause());
        element.addEventListener('mouseleave', () => glitchAnim.play());
      },
    },
    'step-fade': {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      ease: 'outInCirc',
      delay: delay || 0,
    },
    default: {
      opacity: [0, 1],
      translateY: [CONFIG.offset * 0.5, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
      delay,
    },
  };

  const animProps = animations[animType] || animations.default;
  animate(element, animProps);
};

/**
 * Typewriter-Effekt: Zeichen erscheinen nacheinander
 *
 * Verwendung: <p data-animate data-anim-type="typewriter">Text hier</p>
 *
 * @param {HTMLElement} element - Text-Element für Typewriter-Effekt
 * @returns {void}
 */
const animateTypewriter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  const text = element.textContent;
  const delay = parseInt(element.dataset.animDelay || '0');

  // Leere Element und mache es sichtbar
  element.textContent = '';
  element.style.opacity = '1';

  // Splitte Text in einzelne Zeichen und erstelle Spans
  const chars = text.split('');
  const charSpans = chars.map((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
    return span;
  });

  // Animiere jedes Zeichen mit gestaffeltem Delay (10ms pro Zeichen)
  animate(charSpans, {
    opacity: [0, 1],
    duration: 50,
    delay: (el, i) => delay + i * 10,
    ease: 'linear',
  });
};

/**
 * Cycle-Typewriter: Wörter erscheinen/verschwinden in Endlosschleife mit wechselnden Farben
 *
 * Verwendung: <span data-animate data-anim-type="cycle-typewriter"></span>
 *
 * Ablauf:
 * 1. Wort erscheint mit Fade-In und Slide-Up (300ms)
 * 2. Wort bleibt sichtbar (1500ms)
 * 3. Wort verschwindet mit Fade-Out und Slide-Up (300ms)
 * 4. Nächstes Wort beginnt (goto 1)
 *
 * @param {HTMLElement} element - Container-Element für rotierende Wörter
 * @returns {void}
 */
const animateCycleTypewriter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  // Definierte Wörter und zugehörige Tailwind-Farben
  const words = ['Designer.', 'Entwickler.', 'Projektleiter.', 'Tester.', 'Generalist!', 'Ich...'];
  const colors = [
    'text-yellow-500',
    'text-blue-500',
    'text-yellow-500',
    'text-blue-500',
    'text-yellow-500',
    'text-blue-500',
  ];

  let index = 0;

  /**
   * Animiert das nächste Wort in der Sequenz
   * Rekursiv aufgerufen für Endlos-Loop
   */
  const animateNext = () => {
    const word = words[index];
    const color = colors[index];

    element.textContent = word;

    // Entferne alte text-* Klassen und füge neue Farbe hinzu
    const baseClasses = element.className.split(' ').filter((c) => !c.startsWith('text-'));
    element.className = `${baseClasses.join(' ')} ${color}`;

    // Setze Startzustand für Animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';

    // Fade-In Animation (erscheinen von unten)
    animate(element, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 300,
      ease: 'out-expo',
      onComplete: () => {
        // Warte 1.5s bevor Fade-Out startet
        setTimeout(() => {
          // Fade-Out Animation (verschwinden nach oben)
          animate(element, {
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 300,
            ease: 'in-expo',
            onComplete: () => {
              // Nächster Index (Loop bei Ende)
              index = (index + 1) % words.length;
              animateNext();
            },
          });
        }, 1500);
      },
    });
  };

  animateNext();
};

/**
 * Fügt einem Bild einen Glitch-Effekt beim Laden hinzu
 *
 * Verwendung: <img data-glitch src="..." />
 *
 * Erstellt zwei Duplikat-Layers mit Farbversatz (RGB-Split-Effekt)
 * Der Effekt läuft kontinuierlich für intensivere Sichtbarkeit
 *
 * @param {HTMLImageElement} img - Bild-Element für Glitch-Effekt
 * @returns {void}
 */
const addImageGlitch = (img) => {
  img.style.position = 'relative';
  img.style.display = 'block';

  const glitchBefore = document.createElement('div');
  const glitchAfter = document.createElement('div');

  // Erstelle zwei Overlay-Layers mit Bild-Duplikaten
  [glitchBefore, glitchAfter].forEach((el, i) => {
    el.style.cssText = `
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('${img.src}');
      background-size: cover;
      background-position: center;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    `;
    // Verstärkte Blend-Modes für deutlicheren RGB-Split-Effekt
    el.style.mixBlendMode = i === 0 ? 'screen' : 'color-dodge';
    // Farbfilter für stärkeren Glitch-Effekt (Rot und Cyan)
    el.style.filter = i === 0 ? 'hue-rotate(90deg) saturate(3)' : 'hue-rotate(270deg) saturate(3)';
    img.parentElement.style.position = 'relative';
    img.parentElement.insertBefore(el, img);
  });

  let frame = 0;
  const maxFrames = 180; // 3 Sekunden bei 60fps für längere Sichtbarkeit

  /**
   * Glitch-Animation Loop mit abnehmender Intensität
   */
  const glitchAnimation = () => {
    if (frame < maxFrames) {
      // Intensität nimmt über Zeit ab (1.0 → 0.0)
      const intensity = 1 - frame / maxFrames;

      // Verstärkter Offset für deutlich sichtbareren Effekt
      const baseOffset = Math.random() * 40 + 10; // Minimum 10px, Maximum 50px
      const offsetX = (Math.random() - 0.5) * baseOffset * intensity;
      const offsetY = (Math.random() - 0.5) * baseOffset * intensity;

      // Verschiebe Layers mit kombinierten Transformationen
      glitchBefore.style.transform = `translate(${offsetX}px, ${offsetY * 0.5}px) skewX(${Math.random() * 5 - 2.5}deg)`;
      glitchBefore.style.opacity = (Math.random() * 0.5 + 0.3) * intensity; // Min 0.3, Max 0.8

      glitchAfter.style.transform = `translate(${-offsetX}px, ${-offsetY}px) skewX(${Math.random() * 5 - 2.5}deg)`;
      glitchAfter.style.opacity = (Math.random() * 0.5 + 0.3) * intensity; // Min 0.3, Max 0.8

      // Gelegentliche intensive Glitch-Spikes
      if (Math.random() > 0.95) {
        const spikeOffset = 80;
        glitchBefore.style.transform = `translate(${spikeOffset}px, 0) skewX(10deg)`;
        glitchAfter.style.transform = `translate(${-spikeOffset}px, 0) skewX(-10deg)`;
        glitchBefore.style.opacity = 0.9 * intensity;
        glitchAfter.style.opacity = 0.9 * intensity;
      }

      frame++;
      requestAnimationFrame(glitchAnimation);
    } else {
      // Effekt beendet - verstecke Layers
      glitchBefore.style.opacity = '0';
      glitchAfter.style.opacity = '0';
    }
  };

  // Starte Animation wenn Bild geladen ist
  img.addEventListener('load', () => {
    glitchAnimation();
  });

  // Falls Bild bereits geladen (aus Cache)
  if (img.complete) {
    glitchAnimation();
  }
};

/**
 * Erstellt IntersectionObserver für Scroll-basierte Animationen
 *
 * Überwacht alle Elemente mit [data-animate] Attribut und triggert
 * entsprechende Animation wenn Element in Sichtbereich kommt
 *
 * @returns {IntersectionObserver} Konfigurierter Observer
 */
const createObserver = () => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          // Route zu korrekter Animation basierend auf Type
          if (entry.target.dataset.animType === 'typewriter') {
            animateTypewriter(entry.target);
          } else if (entry.target.dataset.animType === 'cycle-typewriter') {
            animateCycleTypewriter(entry.target);
          } else {
            animateElement(entry.target);
          }
        }
      });
    },
    { threshold: CONFIG.threshold, rootMargin: CONFIG.rootMargin }
  );
};

/**
 * Setzt alle Animationen zurück (z.B. bei Page-Transitions)
 * Entfernt animated-Flag und inline-Styles
 *
 * @returns {void}
 */
const resetAnimations = () => {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    delete el.dataset.animated;
    el.style.opacity = '';
    el.style.transform = '';
  });
};

/**
 * Initialisiert das Animations-System
 *
 * - Setzt initial opacity:0 für smooth appearance
 * - Erstellt IntersectionObserver
 * - Registriert alle [data-animate] Elemente
 * - Initialisiert Image-Glitch Effekte
 *
 * @returns {void}
 */
const initAnimations = () => {
  // Cleanup existierender Observer
  if (observer) {
    observer.disconnect();
  }

  // Setze initiale Styles für Elemente die noch nicht animiert wurden
  document.querySelectorAll('[data-animate]:not([data-animated])').forEach((el) => {
    el.style.opacity = '0';
    el.style.willChange = 'opacity, transform'; // Performance-Hint für Browser
  });

  // Nutze requestAnimationFrame für optimales Timing
  requestAnimationFrame(() => {
    observer = createObserver();
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  });

  // Initialisiere Glitch-Effekte für Bilder
  document.querySelectorAll('img[data-glitch]').forEach((img) => {
    addImageGlitch(img);
  });
};

/**
 * Cleanup-Funktion für Page-Transitions
 * Disconnected Observer und räumt Instanzen auf
 *
 * @returns {void}
 */
const cleanup = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (typewriterInstance) {
    typewriterInstance = null;
  }
};

/**
 * Auto-Initialisierung wenn im Browser-Context
 * Unterstützt Astro View Transitions
 */
if (typeof document !== 'undefined') {
  // Initial Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAnimations();
    });
  } else {
    // DOM bereits geladen
    initAnimations();
  }

  // Astro View Transitions Support
  document.addEventListener('astro:before-swap', cleanup); // Cleanup vor Page-Wechsel
  document.addEventListener('astro:after-swap', () => {
    resetAnimations(); // Reset States
    initAnimations(); // Re-Initialize für neue Page
  });
  document.addEventListener('astro:page-load', () => {
    initAnimations(); // Fallback für Direktnavigation
  });
}

// Exportierte Funktionen für manuellen Zugriff
export { initAnimations, animateElement, animateTypewriter, resetAnimations, cleanup };
