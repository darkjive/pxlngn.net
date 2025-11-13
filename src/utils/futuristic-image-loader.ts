/**
 * Futuristic Image Progressive Loading
 * Handles loading states and transitions with performance optimizations
 */

/**
 * Completes the loading animation for a futuristic image
 * Handles skeleton fade-out, blur placeholder fade-out, and image fade-in
 */
function completeLoading(
  skeleton: Element | null,
  blurPlaceholder: Element | null,
  actualImage: HTMLImageElement
): void {
  // Add loaded class to skeleton (fade out)
  skeleton?.classList.add('loaded');

  // Add loaded class to blur placeholder (fade out)
  blurPlaceholder?.classList.add('loaded');

  // Add loaded class to actual image (fade in)
  actualImage.classList.add('loaded');

  // Cleanup after animations complete
  setTimeout(() => {
    skeleton?.remove();
    blurPlaceholder?.remove();
  }, 800);
}

/**
 * Initializes progressive loading for a single futuristic image
 */
function initSingleImage(wrapper: Element): void {
  const skeleton = wrapper.querySelector('[data-futuristic-skeleton]');
  const blurPlaceholder = wrapper.querySelector('[data-blur-placeholder]');
  const actualImage = wrapper.querySelector('[data-futuristic-image]') as HTMLImageElement;

  if (!actualImage) return;

  // Check if image is already loaded (cached)
  if (actualImage.complete && actualImage.naturalHeight !== 0) {
    // Add small delay for visual effect even when cached
    setTimeout(() => completeLoading(skeleton, blurPlaceholder, actualImage), 600);
  } else {
    // Wait for image to load
    actualImage.addEventListener(
      'load',
      () => {
        completeLoading(skeleton, blurPlaceholder, actualImage);
      },
      { once: true }
    );

    // Handle loading errors
    actualImage.addEventListener(
      'error',
      () => {
        console.warn('Futuristic image failed to load:', actualImage.src);
        completeLoading(skeleton, blurPlaceholder, actualImage); // Still remove skeleton on error
      },
      { once: true }
    );
  }
}

/**
 * Initializes all futuristic images on the page
 * Uses Intersection Observer for lazy initialization (performance optimization)
 */
export function initFuturisticImages(): void {
  const wrappers = document.querySelectorAll('[data-futuristic-wrapper]');

  // If Intersection Observer is not supported, initialize all images immediately
  if (!('IntersectionObserver' in window)) {
    wrappers.forEach(initSingleImage);
    return;
  }

  // Use Intersection Observer for lazy initialization
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initSingleImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px', // Start loading 50px before image enters viewport
      threshold: 0.01,
    }
  );

  wrappers.forEach((wrapper) => observer.observe(wrapper));
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFuturisticImages);
} else {
  initFuturisticImages();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:after-swap', initFuturisticImages);
document.addEventListener('astro:page-load', initFuturisticImages);
