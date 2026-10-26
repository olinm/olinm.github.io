(() => {
  const stage = document.querySelector('.orb-stage');
  if (!stage || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const spinner = stage.querySelector('.orb-spinner');
  let dragging = false;
  let startX = 0;
  let turn = 0;
  let tiltX = 0;
  let tiltY = 0;

  const paint = () => {
    spinner.style.setProperty('--turn', `${turn}deg`);
    spinner.style.setProperty('--tilt-x', `${tiltX}deg`);
    spinner.style.setProperty('--tilt-y', `${tiltY}deg`);
  };
  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    startX = event.clientX;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove', (event) => {
    const box = stage.getBoundingClientRect();
    tiltY = ((event.clientX - box.left) / box.width - .5) * 14;
    tiltX = -((event.clientY - box.top) / box.height - .5) * 14;
    if (dragging) {
      turn += (event.clientX - startX) * .55;
      startX = event.clientX;
    }
    paint();
  });
  const release = () => { dragging = false; stage.classList.remove('is-dragging'); };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('pointerleave', () => { if (!dragging) { tiltX = 0; tiltY = 0; paint(); } });
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turn += event.key === 'ArrowLeft' ? -15 : 15;
      paint();
    }
  });
})();
