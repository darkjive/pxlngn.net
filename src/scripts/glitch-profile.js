/**
 * Glitch Profile Image Script
 * Randomly selects and displays one of the glitch images
 * Shows normal.jpg on hover
 */

export function initGlitchProfile() {
  const container = document.querySelector('[data-glitch-profile]');
  if (!container) return;

  const randomImg = container.querySelector('[data-glitch-random]');
  const baseImg = container.querySelector('[data-glitch-base]');
  const loader = container.querySelector('[data-glitch-loader]');

  if (!randomImg || !baseImg || !loader) return;

  // Get all preloaded images from link tags
  const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
  const imageUrls = Array.from(preloadLinks).map((link) => link.getAttribute('href')).filter(Boolean);

  if (imageUrls.length === 0) {
    console.warn('No preloaded images found for glitch profile');
    loader.classList.add('hidden');
    return;
  }

  // Select random image from preloaded URLs
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const selectedImage = imageUrls[randomIndex];

  // Set the random image
  const img = new Image();
  img.onload = () => {
    randomImg.src = selectedImage;
    randomImg.style.opacity = '1';

    // Hide loader after image is loaded
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 100);
  };

  img.onerror = () => {
    console.error('Failed to load glitch profile image:', selectedImage);
    // Fallback to base image
    randomImg.src = baseImg.src;
    loader.classList.add('hidden');
  };

  img.src = selectedImage;
}
