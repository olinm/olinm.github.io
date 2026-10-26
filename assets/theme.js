(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('.theme-toggle');
  const apply = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#050708' : '#f3f4ef');
    buttons.forEach((button) => {
      const next = theme === 'dark' ? 'Light' : 'Dark';
      button.querySelector('b').textContent = next;
      button.setAttribute('aria-label', `Switch to ${next.toLowerCase()} theme`);
    });
  };
  buttons.forEach((button) => button.addEventListener('click', () => apply(root.dataset.theme === 'dark' ? 'light' : 'dark')));
  apply(root.dataset.theme || 'dark');
})();
