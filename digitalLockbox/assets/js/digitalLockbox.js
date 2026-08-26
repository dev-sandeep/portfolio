(function () {
  var toggle = document.querySelector('.insp-nav-toggle');
  var links = document.querySelector('.insp-nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('.insp-img').forEach(function (img) {
    img.addEventListener('error', function () {
      var placeholder = document.createElement('div');
      placeholder.className = 'insp-img-missing';
      placeholder.textContent = img.getAttribute('data-placeholder') || 'Image placeholder';
      if (img.parentElement) {
        img.replaceWith(placeholder);
      }
    });
  });

  var headerOffset = 80;

  document.querySelectorAll('.insp-nav-links a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.pushState(null, '', '#' + id);
      if (links) links.classList.remove('is-open');
    });
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if (!sections.length) return;

  var lastId = location.hash ? location.hash.slice(1) : '';

  function setActiveNav(id) {
    document.querySelectorAll('.insp-nav-links a').forEach(function (anchor) {
      var href = anchor.getAttribute('href') || '';
      var isMatch = href === '#' + id || href.indexOf('#' + id) !== -1;
      anchor.classList.toggle('active', isMatch);
    });
  }

  function updateHashFromScroll() {
    var scrollY = window.scrollY + headerOffset + 20;
    var current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) current = section.id;
    });
    if (current !== lastId) {
      lastId = current;
      if (current) {
        history.replaceState(null, '', '#' + current);
        setActiveNav(current);
      } else {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }

  window.addEventListener('scroll', updateHashFromScroll, { passive: true });
  updateHashFromScroll();

  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) {
      window.requestAnimationFrame(function () {
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: top, behavior: 'auto' });
      });
    }
  }
})();
