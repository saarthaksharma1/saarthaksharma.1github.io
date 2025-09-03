// /assets/js/layout.js
(() => {
    const headerHTML = `
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="/">Saarthak Sharma</a>
      <ul class="nav-links" role="list">
        <li><a href="/" data-nav="home">Home</a></li>
      
        <li><a href="/projects.html" data-nav="projects">Projects</a></li>
        <li><a href="/experience.html" data-nav="experience">Experience</a></li>
        <li><a href="/contact.html" data-nav="contact">Contact</a></li>
      </ul>
    </nav>
  </header>`.trim();
  
    const footerHTML = `
  <footer class="site-footer">
    <div class="container">© <span id="year"></span> Saarthak Sharma</div>
  </footer>`.trim();
  
    function inject() {
      const headerMount = document.getElementById('site-header');
      if (headerMount) headerMount.innerHTML = headerHTML;
  
      const footerMount = document.getElementById('site-footer');
      if (footerMount) {
        footerMount.innerHTML = footerHTML;
        const y = footerMount.querySelector('#year');
        if (y) y.textContent = new Date().getFullYear();
      }
  
      // Mark the current nav item
      const path = location.pathname.replace(/\/+$/, '') || '/';
      document.querySelectorAll('.nav-links a').forEach(a => {
        const href = (a.getAttribute('href') || '/').replace(/\/+$/, '') || '/';
        if (href === path) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  })();
  
  