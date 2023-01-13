export function toggleNavMenu() {
  const ctn = document.getElementById('screen-container');
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('menu');
  const body = document.getElementsByTagName('body')[0];
  ctn.classList.toggle('max-h-screen');
  ctn.classList.toggle('overflow-y-hidden');
  btn.classList.toggle('open');
  nav.classList.toggle('-right-full');
  nav.classList.toggle('right-0');
  body.classList.toggle('overflow-y-hidden');
  body.classList.toggle('overflow-x-hidden');
}
