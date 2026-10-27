(() => {
  const tooltip = document.querySelector('#chart-tooltip');
  if (!tooltip) return;

  let activeButton = null;
  let closeOnClick = false;
  const close = () => { tooltip.hidden = true; activeButton = null; };

  document.addEventListener('pointerdown', event => {
    const button = event.target.closest('.info-dot');
    closeOnClick = Boolean(button && button === activeButton && !tooltip.hidden);
  }, true);

  document.addEventListener('click', event => {
    const button = event.target.closest('.info-dot');
    if (button) {
      if (closeOnClick) close();
      else activeButton = button;
      closeOnClick = false;
      return;
    }
    if (!event.target.closest('#chart-tooltip')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
  document.addEventListener('scroll', close, {capture: true, passive: true});
})();
