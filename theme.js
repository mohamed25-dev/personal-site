(function () {
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transition');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme-preference', next);
    toggle.textContent = '// ' + (next === 'dark' ? 'light' : 'dark');
    setTimeout(function () {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  });

  // Set initial button label
  toggle.textContent = '// ' + (currentTheme() === 'dark' ? 'light' : 'dark');

  // Listen for system preference changes (only if no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (localStorage.getItem('theme-preference')) return;
    var theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    toggle.textContent = '// ' + (theme === 'dark' ? 'light' : 'dark');
  });
})();
