export function toggleNavMenu() {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('menu');
  const body = document.getElementsByTagName('body')[0];
  btn.classList.toggle('open');
  nav.classList.toggle('-right-full');
  nav.classList.toggle('right-0');
  body.classList.toggle('overflow-y-hidden');
  body.classList.toggle('overflow-x-hidden');
}
