/**
 * Glitch Profile Image Script
 * Creates random glitch effect by briefly showing glitch images
 * Only active when image is in viewport
 */

export function initGlitchProfile() {
  const wrapper = document.querySelector('[data-glitch-profile]');
  if (!wrapper) return;

  const loader = wrapper.querySelector('[data-glitch-loader]');
  const overlays = wrapper.querySelectorAll('[data-glitch-overlay]');

  if (!overlays.length || !loader) return;

  let isInViewport = false;
  let glitchInterval = null;
  let isHovered = false;

  // Hide loader when ready
  const skeleton = loader.querySelector('[data-futuristic-skeleton]');
  if (skeleton) {
    setTimeout(() => {
      skeleton.classList.add('loaded');
    }, 100);
  }

  // Intersection Observer to detect viewport visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInViewport = entry.isIntersecting;

        if (isInViewport && !isHovered) {
          startGlitchEffect();
        } else {
          stopGlitchEffect();
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of image is visible
    }
  );

  observer.observe(wrapper);

  // Pause glitch on hover
  wrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    stopGlitchEffect();
  });

  wrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    if (isInViewport) {
      startGlitchEffect();
    }
  });

  function startGlitchEffect() {
    if (glitchInterval) return; // Already running

    // Random glitch effect between 2-5 seconds
    const triggerGlitch = () => {
      const randomDelay = Math.random() * 3000 + 2000; // 2-5 seconds

      glitchInterval = setTimeout(() => {
        // Select random overlay
        const randomIndex = Math.floor(Math.random() * overlays.length);
        const overlay = overlays[randomIndex];

        // Show glitch briefly
        overlay.classList.add('glitch-active');

        // Hide after 200-400ms
        const glitchDuration = Math.random() * 200 + 200;
        setTimeout(() => {
          overlay.classList.remove('glitch-active');

          // Schedule next glitch if still in viewport
          if (isInViewport && !isHovered) {
            triggerGlitch();
          }
        }, glitchDuration);
      }, randomDelay);
    };

    triggerGlitch();
  }

  function stopGlitchEffect() {
    if (glitchInterval) {
      clearTimeout(glitchInterval);
      glitchInterval = null;
    }

    // Remove any active glitches
    overlays.forEach((overlay) => {
      overlay.classList.remove('glitch-active');
    });
  }
}
