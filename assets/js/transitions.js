// Fade between pages if supported; otherwise normal navigation.
(function () {
  const supportsVT = !!document.startViewTransition;
  if (!supportsVT) return;

  function shouldIntercept(a) {
    if (!a) return false;
    const url = new URL(a.href, location.href);
    return url.origin === location.origin && url.pathname !== location.pathname && !a.hasAttribute('data-no-transition');
  }

  addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!shouldIntercept(a)) return;
    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = a.href;
    });
  });

  // Set year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
// assets/js/transitions.js

(function () {
  const FADE_MS = 300; // keep in sync with CSS 300ms

  // Show the page when DOM is ready
  function reveal() {
    document.body.classList.add('is-visible');
  }

  // Handle BFCache (back/forward cache) restores in Safari/Firefox
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) reveal();
  });

  document.addEventListener('DOMContentLoaded', reveal);

  // Should this link get a fade-out?
  function shouldIntercept(link) {
    // Opt-out with data-no-fade
    if (link.hasAttribute('data-no-fade')) return false;

    const url = new URL(link.href, location.href);

    // External links or different origin
    if (url.origin !== location.origin) return false;

    // Open in new tab / downloads / special schemes
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (url.protocol === 'mailto:' || url.protocol === 'tel:') return false;

    // Hash-only navigation on the same page
    if (url.pathname === location.pathname && url.hash && url.hash !== '#') return false;

    return true;
  }

  // Intercept clicks on <a> and fade out before navigating
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !a.href) return;

    if (!shouldIntercept(a)) return;

    e.preventDefault();
    document.body.classList.remove('is-visible');
    document.body.classList.add('is-exiting');

    // Navigate after fade-out
    setTimeout(() => {
      window.location.assign(a.href);
    }, FADE_MS);
  });

  // (Optional) fade on form submits too
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.getAttribute('data-no-fade') === 'true') return;
    document.body.classList.remove('is-visible');
    document.body.classList.add('is-exiting');
  });
})();
