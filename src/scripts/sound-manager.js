/**
 * Sound Manager
 *
 * Verwaltet Hintergrundmusik (Ambiance) und UI-Sounds (Hover, Click)
 * für die gesamte Website. Unterstützt Theme-basierte Ambiance-Wechsel.
 *
 * Features:
 * - Theme-basierte Ambiance (Dark/Light/Legal)
 * - Hover- und Click-Sounds für interaktive Elemente
 * - LocalStorage-Persistenz für Sound-Einstellungen
 * - Automatischer Theme-Wechsel Support
 */

/**
 * Hilfs-Funktion zum Anhängen von Event-Listenern
 *
 * @param {string|NodeList} selector - CSS-Selector oder NodeList
 * @param {string} event - Event-Name (z.B. 'click', 'mouseenter')
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
 * Initialisiert das Sound-Management-System
 *
 * Setup:
 * - Lädt gespeicherte Sound-Einstellungen
 * - Erkennt aktuelle Seite (Legal/Standard)
 * - Startet passende Ambiance
 * - Registriert Event-Listener für UI-Sounds
 *
 * @returns {void}
 */
export function initSoundManager() {
  // Global sound state
  let soundsEnabled = localStorage.getItem('sounds-enabled') !== 'false';
  let currentAmbiance = null;

  // Get all audio elements
  const ambianceDark = document.getElementById('ambiance-dark');
  const ambianceLight = document.getElementById('ambiance-light');
  const ambianceLegal = document.getElementById('ambiance-legal');
  const soundHover = document.getElementById('sound-hover');
  const soundClick = document.getElementById('sound-click');

  // Check if we're on a legal page (Impressum/Datenschutz)
  const isLegalPage = window.location.pathname.includes('/terms') || window.location.pathname.includes('/privacy');

  /**
   * Ermittelt die aktive Ambiance basierend auf Theme und Seite
   *
   * @returns {HTMLAudioElement|null} Aktives Audio-Element
   */
  function getActiveAmbiance() {
    if (isLegalPage) return ambianceLegal;
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? ambianceDark : ambianceLight;
  }

  /**
   * Spielt einen Sound ab (mit Fehlerbehandlung)
   *
   * @param {HTMLAudioElement} audio - Audio-Element
   * @returns {void}
   */
  function playSound(audio) {
    if (!audio || !soundsEnabled) return;
    audio.currentTime = 0;
    audio.play().catch((err) => console.log('Sound play failed:', err));
  }

  /**
   * Wechselt die Hintergrund-Ambiance
   *
   * - Stoppt alte Ambiance
   * - Startet neue Ambiance (falls Sounds aktiviert)
   *
   * @param {HTMLAudioElement} newAmbiance - Neue Ambiance
   * @returns {void}
   */
  function switchAmbiance(newAmbiance) {
    if (currentAmbiance === newAmbiance) return;

    // Stop current ambiance
    if (currentAmbiance) {
      currentAmbiance.pause();
      currentAmbiance.currentTime = 0;
    }

    currentAmbiance = newAmbiance;

    // Play new ambiance if sounds enabled
    if (soundsEnabled && currentAmbiance) {
      currentAmbiance.play().catch((err) => console.log('Ambiance play failed:', err));
    }
  }

  // Sound Toggle Button
  attachEvent('[data-sound-toggle]', 'click', function (_, button) {
    const iconOn = button.querySelector('[data-sound-icon-on]');
    const iconOff = button.querySelector('[data-sound-icon-off]');

    soundsEnabled = !soundsEnabled;
    localStorage.setItem('sounds-enabled', soundsEnabled);

    // Update icon
    if (soundsEnabled) {
      iconOn.classList.add('hidden');
      iconOff.classList.remove('hidden');
      // Start ambiance
      if (currentAmbiance) {
        currentAmbiance.play().catch((err) => console.log('Ambiance play failed:', err));
      }
    } else {
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
      // Stop all sounds
      [ambianceDark, ambianceLight, ambianceLegal].forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  });

  // Theme change listener (switch ambiance on theme change)
  if (!isLegalPage) {
    attachEvent('[data-aw-toggle-color-scheme]', 'click', function () {
      setTimeout(() => {
        const newAmbiance = getActiveAmbiance();
        switchAmbiance(newAmbiance);
      }, 50);
    });
  }

  // Hover sounds for links (header, main, footer)
  attachEvent('#header nav a, main a, footer a', 'mouseenter', function () {
    playSound(soundHover);
  });

  // Click sounds for buttons
  attachEvent('button, .btn, [role="button"]', 'click', function () {
    playSound(soundClick);
  });

  // Initialize ambiance
  switchAmbiance(getActiveAmbiance());

  // Update button icon based on initial state
  const button = document.querySelector('[data-sound-toggle]');
  if (button) {
    const iconOn = button.querySelector('[data-sound-icon-on]');
    const iconOff = button.querySelector('[data-sound-icon-off]');
    if (soundsEnabled) {
      iconOn.classList.add('hidden');
      iconOff.classList.remove('hidden');
    } else {
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
    }
  }
}
