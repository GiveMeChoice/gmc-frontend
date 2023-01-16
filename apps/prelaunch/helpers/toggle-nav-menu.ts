export function toggleNavMenu() {
  const hamburgerButton = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const screen = document.getElementById('screen');
  hamburgerButton.classList.toggle('open');
  mobileMenu.classList.toggle('right-0');
  mobileMenu.classList.toggle('-right-full');
  screen.classList.toggle('overflow-y-hidden');
  screen.classList.toggle('overflow-x-hidden');
  screen.classList.toggle('max-h-screen');
}
