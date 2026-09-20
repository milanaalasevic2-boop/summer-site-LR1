document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 600px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function closeMenu(returnFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.hidden = mobile.matches;
  if (returnFocus) toggle.focus();
}
function syncMenu() {
  if (!mobile.matches && navigation.contains(document.activeElement)) document.activeElement.blur();
  closeMenu();
}
syncMenu();
mobile.addEventListener('change', syncMenu);
toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opening));
  navigation.hidden = !opening;
  if (opening && window.gsap && !reducedMotion.matches) {
    gsap.fromTo(navigation, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: .25, overwrite: true, clearProps: 'opacity,transform' });
  }
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (mobile.matches) {
    closeMenu();
    const target = document.querySelector(link.getAttribute('href'));
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
if (window.gsap) {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-enter', { autoAlpha: 0, y: 16, duration: .75, stagger: .1, ease: 'power2.out', clearProps: 'all' });
    gsap.from('.hero-visual', { autoAlpha: 0, y: 18, duration: 1, delay: .15, ease: 'power2.out', clearProps: 'all' });
  });
}
