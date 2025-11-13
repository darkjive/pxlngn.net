import { animate } from 'animejs';

const CONFIG = {
  duration: 450,
  easing: 'outInCirc',
  offset: 50,
  threshold: 0.15,
  rootMargin: '0px',
};

let observer = null;
let typewriterInstance = null;

const animateElement = (element) => {
  
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  const animType = element.dataset.animType || 'default';
  const delay = parseInt(element.dataset.animDelay || '0');

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

const animateTypewriter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  const text = element.textContent;
  const delay = parseInt(element.dataset.animDelay || '0');

  element.textContent = '';
  element.style.opacity = '1';

  const chars = text.split('');
  const charSpans = chars.map((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
    return span;
  });

  animate(charSpans, {
    opacity: [0, 1],
    duration: 50,
    delay: (el, i) => delay + i * 10,
    ease: 'linear',
  });
};

const animateCycleTypewriter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

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

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  cursor.style.cssText = `
    display: inline-block;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  `;

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

  element.style.opacity = '1';
  element.appendChild(cursor);

  const animateNext = () => {
    const word = words[index];
    const color = colors[index];

    const baseClasses = element.className.split(' ').filter((c) => !c.startsWith('text-'));
    element.className = `${baseClasses.join(' ')} ${color}`;

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

  const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  if (isLowEndDevice) {
    img.dataset.glitchSkipped = 'true';
    return;
  }

  img.style.position = 'relative';
  img.style.display = 'block';

  const glitchBefore = document.createElement('div');
  const glitchAfter = document.createElement('div');

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
    
    el.style.mixBlendMode = i === 0 ? 'screen' : 'color-dodge';
    
    el.style.filter = i === 0 ? 'hue-rotate(90deg) saturate(3)' : 'hue-rotate(270deg) saturate(3)';
    img.parentElement.style.position = 'relative';
    img.parentElement.insertBefore(el, img);
  });

  let animationFrameId = null;
  let timeoutId = null;

  const runGlitchAnimation = () => {
    let frame = 0;
    const maxFrames = 60; 
    let lastFrameTime = performance.now();

    const glitchAnimation = (currentTime) => {
      
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < 16) {
        animationFrameId = requestAnimationFrame(glitchAnimation);
        return;
      }
      lastFrameTime = currentTime;

      if (frame < maxFrames) {
        
        const intensity = 1 - frame / maxFrames;

        const baseOffset = Math.random() * 30 + 5; 
        const offsetX = (Math.random() - 0.5) * baseOffset * intensity;
        const offsetY = (Math.random() - 0.5) * baseOffset * intensity;

        glitchBefore.style.transform = `translate(${offsetX}px, ${offsetY * 0.5}px) skewX(${Math.random() * 3 - 1.5}deg)`;
        glitchBefore.style.opacity = (Math.random() * 0.4 + 0.2) * intensity; 

        glitchAfter.style.transform = `translate(${-offsetX}px, ${-offsetY}px) skewX(${Math.random() * 3 - 1.5}deg)`;
        glitchAfter.style.opacity = (Math.random() * 0.4 + 0.2) * intensity; 

        if (Math.random() > 0.97) {
          const spikeOffset = 60; 
          glitchBefore.style.transform = `translate(${spikeOffset}px, 0) skewX(8deg)`;
          glitchAfter.style.transform = `translate(${-spikeOffset}px, 0) skewX(-8deg)`;
          glitchBefore.style.opacity = 0.7 * intensity;
          glitchAfter.style.opacity = 0.7 * intensity;
        }

        frame++;
        animationFrameId = requestAnimationFrame(glitchAnimation);
      } else {
        
        glitchBefore.style.opacity = '0';
        glitchAfter.style.opacity = '0';

        const nextDelay = Math.random() * 5000 + 10000;
        timeoutId = setTimeout(() => {
          runGlitchAnimation();
        }, nextDelay);
      }
    };

    glitchAnimation(performance.now());
  };

  const glitchObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !img.dataset.glitchStarted) {
          img.dataset.glitchStarted = 'true';
          
          runGlitchAnimation();
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px' }
  );

  const startObserving = () => {
    glitchObserver.observe(img);
  };

  if (img.complete) {
    startObserving();
  } else {
    img.addEventListener('load', startObserving);
  }

  img.dataset.glitchCleanup = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (timeoutId) clearTimeout(timeoutId);
    glitchObserver.disconnect();
  };
};

const createObserver = () => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          
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
    el.style.willChange = 'opacity, transform'; 
  });

  requestAnimationFrame(() => {
    observer = createObserver();
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  });

  document.querySelectorAll('img[data-glitch]').forEach((img) => {
    addImageGlitch(img);
  });
};

const cleanup = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (typewriterInstance) {
    typewriterInstance = null;
  }
};

if (typeof document !== 'undefined') {
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAnimations();
    });
  } else {
    
    initAnimations();
  }

  document.addEventListener('astro:before-swap', cleanup); 
  document.addEventListener('astro:after-swap', () => {
    resetAnimations(); 
    initAnimations(); 
  });
  document.addEventListener('astro:page-load', () => {
    initAnimations(); 
  });
}

export { initAnimations, animateElement, animateTypewriter, resetAnimations, cleanup };
