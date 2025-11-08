import { animate } from 'animejs';

const CONFIG = {
  duration: 600,
  easing: 'easeOutExpo',
  offset: 40,
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
      easing: CONFIG.easing,
      delay,
    },
    'fade-down': {
      opacity: [0, 1],
      translateY: [-CONFIG.offset, 0],
      duration: CONFIG.duration,
      easing: CONFIG.easing,
      delay,
    },
    'fade-left': {
      opacity: [0, 1],
      translateX: [CONFIG.offset, 0],
      duration: CONFIG.duration,
      easing: CONFIG.easing,
      delay,
    },
    'fade-right': {
      opacity: [0, 1],
      translateX: [-CONFIG.offset, 0],
      duration: CONFIG.duration,
      easing: CONFIG.easing,
      delay,
    },
    'logo-slide': {
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
      delay: 0,
    },
    'scale-up': {
      opacity: [0, 1],
      scale: [0.1, 1],
      duration: CONFIG.duration,
      easing: 'easeOutBack',
      delay,
    },
    glitch: {
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutQuad',
      delay,
      complete: () => {
        const glitchAnim = animate(element, {
          translateX: [
            { value: -5, duration: 100 },
            { value: 5, duration: 100 },
            { value: -3, duration: 100 },
            { value: 3, duration: 100 },
            { value: 0, duration: 100 },
          ],
          opacity: [
            { value: 0.8, duration: 100 },
            { value: 1, duration: 100 },
            { value: 0.9, duration: 100 },
            { value: 1, duration: 200 },
          ],
          easing: 'linear',
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
      easing: 'easeOutQuad',
      delay: delay || 0,
    },
    default: {
      opacity: [0, 1],
      translateY: [CONFIG.offset * 0.5, 0],
      duration: CONFIG.duration,
      easing: CONFIG.easing,
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
    delay: (el, i) => delay + i * 30,
    easing: 'linear',
  });
};

// ============================================================
// 🔥 cycle-typewriter Animation - Wörter mit Farben durchlaufen
// ============================================================
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

  const animateNext = () => {
    const word = words[index];
    const color = colors[index];

    // Text einsetzen
    element.textContent = word;

    // Farbe setzen - Klassen-Liste bereinigen und neue Farbe hinzufügen
    const baseClasses = element.className.split(' ').filter((c) => !c.startsWith('text-'));
    element.className = `${baseClasses.join(' ')} ${color}`;

    // Element initial unsichtbar machen
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';

    // Erscheinen-Animation
    animate(element, {
      // opacity: [0, 100],
      // translateY: [10, 0],
      duration: 0,
      easing: 'easeOutExpo',
      complete: () => {
        // Nach kurzer Pause: Ausblenden und Wechsel
        setTimeout(() => {
          animate(element, {
            opacity: [1, 1],
            // translateY: [0, -10],
            duration: 10,
            easing: 'easeInExpo',
            complete: () => {
              index = (index + 1) % words.length;
              animateNext();
            },
          });
        }, 1000);
      },
    });
  };

  animateNext();
};

// ============================================================

const addImageGlitch = (img) => {
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
    `;
    el.style.mixBlendMode = i === 0 ? 'screen' : 'multiply';
    img.parentElement.style.position = 'relative';
    img.parentElement.insertBefore(el, img);
  });

  let frame = 0;
  const maxFrames = 60;

  const glitchAnimation = () => {
    if (frame < maxFrames) {
      const intensity = 1 - frame / maxFrames;
      const offset = Math.random() * 20 * intensity;

      glitchBefore.style.transform = `translateX(${offset}px)`;
      glitchBefore.style.opacity = Math.random() * 0.8 * intensity;

      glitchAfter.style.transform = `translateX(-${offset}px)`;
      glitchAfter.style.opacity = Math.random() * 0.8 * intensity;

      frame++;
      requestAnimationFrame(glitchAnimation);
    } else {
      glitchBefore.style.opacity = '0';
      glitchAfter.style.opacity = '0';
    }
  };

  img.addEventListener('load', () => {
    glitchAnimation();
  });

  if (img.complete) {
    glitchAnimation();
  }
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

const initAnimations = () => {
  if (observer) {
    observer.disconnect();
  }

  document.querySelectorAll('[data-animate]:not([data-animated])').forEach((el) => {
    el.style.opacity = '100';
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

const initThemeToggleAnimation = () => {
  const toggleBtn = document.querySelector('[data-aw-toggle-color-scheme]');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const sunIcon = toggleBtn.querySelector('[class*="dark:hidden"]');
    const moonIcon = toggleBtn.querySelector('[class*="dark:block"]');

    [sunIcon, moonIcon].forEach((icon) => {
      if (icon) {
        animate(icon, {
          scale: [1, 0],
          rotate: [0, 180],
          duration: 300,
          easing: 'easeInOutQuad',
          complete: () => {
            animate(icon, {
              scale: [0, 1],
              rotate: [180, 360],
              duration: 300,
              easing: 'easeInOutQuad',
            });
          },
        });
      }
    });
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
      initThemeToggleAnimation();
    });
  } else {
    initAnimations();
    initThemeToggleAnimation();
  }

  document.addEventListener('astro:before-swap', cleanup);
  document.addEventListener('astro:after-swap', () => {
    resetAnimations();
    initAnimations();
    initThemeToggleAnimation();
  });
  document.addEventListener('astro:page-load', () => {
    initAnimations();
    initThemeToggleAnimation();
  });
}

export { initAnimations, animateElement, animateTypewriter, resetAnimations, cleanup };
