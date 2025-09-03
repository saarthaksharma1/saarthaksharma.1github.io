// /assets/js/layout.js
(() => {
  const headerHTML = `
<header class="site-header">
  <nav class="nav">
    <a class="brand" href="index.html">Saarthak Sharma</a>
    <ul class="nav-links" role="list">
      <li><a href="index.html" data-nav="home">Home</a></li>
      <li><a href="projects.html" data-nav="projects">Projects</a></li>
      <li><a href="experience.html" data-nav="experience">Experience</a></li>
      <li><a href="contact.html" data-nav="contact">Contact</a></li>
    </ul>
  </nav>
</header>`.trim();

  const footerHTML = `
<footer class="site-footer">
  <div class="container">© <span id="year"></span> Saarthak Sharma</div>
</footer>`.trim();

  function markActiveLink() {
    // Get current filename (default to index.html)
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    document.querySelectorAll('.nav-links a').forEach(a => {
      const target = (a.getAttribute('href') || '')
        .split('/')
        .pop()
        .toLowerCase() || 'index.html';

      if (current === target) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  function inject() {
    const headerMount = document.getElementById('site-header');
    if (headerMount) headerMount.innerHTML = headerHTML;

    const footerMount = document.getElementById('site-footer');
    if (footerMount) {
      footerMount.innerHTML = footerHTML;
      const y = footerMount.querySelector('#year');
      if (y) y.textContent = new Date().getFullYear();
    }

    markActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
