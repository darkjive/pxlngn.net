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
 * Prüfe ob Nutzer reduzierte Bewegung bevorzugt
 * Respektiert Browser/OS-Einstellung für Barrierefreiheit
 * @type {boolean}
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Respektiere Nutzer-Präferenz für reduzierte Bewegung
  if (prefersReducedMotion) {
    // Zeige Element sofort ohne Animation
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }

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
      translateX: [-100, 0],
      duration: CONFIG.duration,
      ease: CONFIG.easing,
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
      duration: 10,
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

  // Respektiere Nutzer-Präferenz für reduzierte Bewegung
  if (prefersReducedMotion) {
    element.style.opacity = '1';
    return;
  }

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
 * Decipher-Effekt: Zeichen werden von zufälligen Zeichen zu finalem Text "entschlüsselt"
 *
 * Verwendung: <h1 data-animate data-anim-type="decipher">Headline</h1>
 *
 * @param {HTMLElement} element - Text-Element für Decipher-Effekt
 * @returns {void}
 */
const animateDecipher = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  const text = element.textContent;

  // Respektiere Nutzer-Präferenz für reduzierte Bewegung
  if (prefersReducedMotion) {
    element.style.opacity = '1';
    return;
  }

  const delay = parseInt(element.dataset.animDelay || '0');
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Mache Element sichtbar
  element.style.opacity = '1';

  // Teile Text in einzelne Zeichen
  const textChars = text.split('');
  const iterations = 20; // Anzahl der Iterationen pro Zeichen

  setTimeout(() => {
    let frame = 0;
    const interval = setInterval(() => {
      element.textContent = textChars
        .map((char, index) => {
          // Zeichen für Zeichen "entschlüsseln"
          if (index < frame / 3) {
            return text[index];
          }
          // Zufälliges Zeichen anzeigen, aber Leerzeichen beibehalten
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      frame++;

      // Stoppe wenn alle Zeichen entschlüsselt sind
      if (frame >= textChars.length * 3 + iterations) {
        clearInterval(interval);
        element.textContent = text;
      }
    }, 30); // 30ms pro Frame
  }, delay);
};

/**
 * Cycle-Typewriter: Wörter werden Buchstabe für Buchstabe geschrieben und gelöscht mit blinkendem Cursor
 *
 * Verwendung: <span data-animate data-anim-type="cycle-typewriter"></span>
 *
 * Ablauf:
 * 1. Buchstaben werden einzeln hinzugefügt (100ms pro Buchstabe)
 * 2. Wort bleibt sichtbar (1500ms)
 * 3. Buchstaben werden einzeln gelöscht (50ms pro Buchstabe)
 * 4. Nächstes Wort beginnt (goto 1)
 *
 * @param {HTMLElement} element - Container-Element für rotierende Wörter
 * @returns {void}
 */
const animateCycleTypewriter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  // Definierte Wörter und zugehörige Tailwind-Farben
  const words = ['Designer.', 'Projektleiter.', 'Tester.', 'Entwickler!', 'Ich...'];
  const colors = [
    'text-yellow-500',
    'text-primary',
    'text-yellow-500',
    'text-primary',
    'text-yellow-500',
    'text-primary',
  ];

  // Respektiere Nutzer-Präferenz für reduzierte Bewegung
  if (prefersReducedMotion) {
    // Zeige erstes Wort statisch
    element.textContent = words[0];
    element.className += ` ${colors[0]}`;
    element.style.opacity = '1';
    return;
  }

  let index = 0;

  // Erstelle Cursor-Element
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  cursor.style.cssText = `
    display: inline-block;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  `;

  // Füge CSS-Animation für blinkenden Cursor hinzu (falls noch nicht vorhanden)
  if (!document.getElementById('typewriter-cursor-style')) {
    const style = document.createElement('style');
    style.id = 'typewriter-cursor-style';
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Element initial sichtbar machen
  element.style.opacity = '1';
  element.appendChild(cursor);

  /**
   * Animiert das nächste Wort in der Sequenz
   * Rekursiv aufgerufen für Endlos-Loop
   */
  const animateNext = () => {
    const word = words[index];
    const color = colors[index];

    // Entferne alte text-* Klassen und füge neue Farbe hinzu
    const baseClasses = element.className.split(' ').filter((c) => !c.startsWith('text-'));
    element.className = `${baseClasses.join(' ')} ${color}`;

    // Leere aktuellen Text (behalte nur Cursor)
    element.textContent = '';
    element.appendChild(cursor);

    let currentText = '';
    let charIndex = 0;

    // Schreibphase: Füge Buchstaben hinzu
    const typeInterval = setInterval(() => {
      if (charIndex < word.length) {
        currentText += word[charIndex];
        element.textContent = currentText;
        element.appendChild(cursor);
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Warte 1.5 Sekunden bevor Löschen beginnt
        setTimeout(() => {
          // Löschphase: Entferne Buchstaben
          const deleteInterval = setInterval(() => {
            if (currentText.length > 0) {
              currentText = currentText.slice(0, -1);
              element.textContent = currentText;
              element.appendChild(cursor);
            } else {
              clearInterval(deleteInterval);

              // Nächster Index (Loop bei Ende)
              index = (index + 1) % words.length;

              // Kurze Pause vor nächstem Wort
              setTimeout(() => {
                animateNext();
              }, 500);
            }
          }, 50); // 50ms pro Zeichen beim Löschen (schneller als Schreiben)
        }, 1500);
      }
    }, 100); // 100ms pro Zeichen beim Schreiben
  };

  animateNext();
};

/**
 * Fügt einem Bild einen Glitch-Effekt beim Laden hinzu
 *
 * Verwendung: <img data-glitch src="..." />
 *
 * Erstellt zwei Duplikat-Layers mit Farbversatz (RGB-Split-Effekt)
 * Der Effekt läuft beim Viewport-Scroll und wiederholt sich in zufälligen Intervallen
 *
 * @param {HTMLImageElement} img - Bild-Element für Glitch-Effekt
 * @returns {void}
 */
const addImageGlitch = (img) => {
  // Verhindere doppelte Initialisierung
  if (img.dataset.glitchInitialized) return;
  img.dataset.glitchInitialized = 'true';

  // Performance check: Skip glitch on low-end devices
  const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  if (isLowEndDevice) {
    img.dataset.glitchSkipped = 'true';
    return;
  }

  // Respektiere Nutzer-Präferenz für reduzierte Bewegung
  if (prefersReducedMotion) {
    img.dataset.glitchSkipped = 'true';
    return;
  }

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
      will-change: transform, opacity;
    `;
    // Verstärkte Blend-Modes für deutlicheren RGB-Split-Effekt
    el.style.mixBlendMode = i === 0 ? 'screen' : 'color-dodge';
    // Farbfilter für stärkeren Glitch-Effekt (Rot und Cyan)
    el.style.filter = i === 0 ? 'hue-rotate(90deg) saturate(3)' : 'hue-rotate(270deg) saturate(3)';
    img.parentElement.style.position = 'relative';
    img.parentElement.insertBefore(el, img);
  });

  let animationFrameId = null;
  let timeoutId = null;

  /**
   * Glitch-Animation Loop mit abnehmender Intensität
   * Optimized: Reduced frames from 180 to 60 (1 second instead of 3)
   */
  const runGlitchAnimation = () => {
    let frame = 0;
    const maxFrames = 60; // 1 Sekunde bei 60fps (optimiert von 180)
    let lastFrameTime = performance.now();

    const glitchAnimation = (currentTime) => {
      // Prüfe ob Animation pausiert ist (Tab im Hintergrund)
      if (img.dataset.glitchPaused === 'true') {
        animationFrameId = requestAnimationFrame(glitchAnimation);
        return;
      }

      // Throttle to max 60fps
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < 16) {
        animationFrameId = requestAnimationFrame(glitchAnimation);
        return;
      }
      lastFrameTime = currentTime;

      if (frame < maxFrames) {
        // Intensität nimmt über Zeit ab (1.0 → 0.0)
        const intensity = 1 - frame / maxFrames;

        // Reduzierter Offset für bessere Performance
        const baseOffset = Math.random() * 30 + 5; // Minimum 5px, Maximum 35px (optimiert)
        const offsetX = (Math.random() - 0.5) * baseOffset * intensity;
        const offsetY = (Math.random() - 0.5) * baseOffset * intensity;

        // Verschiebe Layers mit kombinierten Transformationen
        glitchBefore.style.transform = `translate(${offsetX}px, ${offsetY * 0.5}px) skewX(${Math.random() * 3 - 1.5}deg)`;
        glitchBefore.style.opacity = (Math.random() * 0.4 + 0.2) * intensity; // Min 0.2, Max 0.6 (reduziert)

        glitchAfter.style.transform = `translate(${-offsetX}px, ${-offsetY}px) skewX(${Math.random() * 3 - 1.5}deg)`;
        glitchAfter.style.opacity = (Math.random() * 0.4 + 0.2) * intensity; // Min 0.2, Max 0.6 (reduziert)

        // Gelegentliche intensive Glitch-Spikes (reduzierte Häufigkeit)
        if (Math.random() > 0.97) {
          const spikeOffset = 60; // Reduziert von 80
          glitchBefore.style.transform = `translate(${spikeOffset}px, 0) skewX(8deg)`;
          glitchAfter.style.transform = `translate(${-spikeOffset}px, 0) skewX(-8deg)`;
          glitchBefore.style.opacity = 0.7 * intensity;
          glitchAfter.style.opacity = 0.7 * intensity;
        }

        frame++;
        animationFrameId = requestAnimationFrame(glitchAnimation);
      } else {
        // Effekt beendet - verstecke Layers
        glitchBefore.style.opacity = '0';
        glitchAfter.style.opacity = '0';

        // Plane nächste Animation in längerem Intervall (10-15 Sekunden statt 5-10)
        const nextDelay = Math.random() * 5000 + 10000;
        timeoutId = setTimeout(() => {
          runGlitchAnimation();
        }, nextDelay);
      }
    };

    glitchAnimation(performance.now());
  };

  // IntersectionObserver für Viewport-Detection
  const glitchObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !img.dataset.glitchStarted) {
          img.dataset.glitchStarted = 'true';
          // Starte erste Animation sofort beim Viewport-Eintritt
          runGlitchAnimation();
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px' }
  );

  // Beobachte das Bild
  const startObserving = () => {
    glitchObserver.observe(img);
  };

  // Starte Beobachtung wenn Bild geladen ist
  if (img.complete) {
    startObserving();
  } else {
    img.addEventListener('load', startObserving);
  }

  // Cleanup-Funktion für Speicherlecks
  img.dataset.glitchCleanup = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (timeoutId) clearTimeout(timeoutId);
    glitchObserver.disconnect();
  };
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
          } else if (entry.target.dataset.animType === 'decipher') {
            animateDecipher(entry.target);
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

  // Tab Visibility API: Pausiere Animationen wenn Tab nicht sichtbar
  // Spart CPU/Battery und verbessert Performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Tab ist im Hintergrund - stoppe alle laufenden Animationen
      document.querySelectorAll('[data-glitch-initialized]').forEach((img) => {
        img.dataset.glitchPaused = 'true';
      });
    } else {
      // Tab ist wieder sichtbar - setze Animationen fort
      document.querySelectorAll('[data-glitch-initialized]').forEach((img) => {
        delete img.dataset.glitchPaused;
      });
    }
  });
}

// Exportierte Funktionen für manuellen Zugriff
export { initAnimations, animateElement, animateTypewriter, resetAnimations, cleanup };
