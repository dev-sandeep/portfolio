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
})();
