(() => {
  const stage = document.querySelector('.orb-stage');
  const canvas = stage?.querySelector('.spheroid-canvas');
  if (!stage || !canvas) return;
  const context = canvas.getContext('2d');
  const sprite = new Image();
  const frameCount = 36;
  const tile = 320;
  let frame = 18;
  let direction = 1;
  let dragging = false;
  let startX = 0;
  let lastAdvance = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const draw = () => {
    const index = Math.max(0, Math.min(frameCount - 1, Math.round(frame)));
    const sx = (index % 6) * tile;
    const sy = Math.floor(index / 6) * tile;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sprite, sx, sy, tile, tile, 0, 0, canvas.width, canvas.height);
  };
  const animate = (time) => {
    if (!dragging && !reducedMotion && time - lastAdvance > 115) {
      frame += direction;
      if (frame >= frameCount - 1 || frame <= 0) direction *= -1;
      lastAdvance = time;
      draw();
    }
    requestAnimationFrame(animate);
  };

  sprite.addEventListener('load', () => { draw(); requestAnimationFrame(animate); });
  sprite.src = canvas.dataset.sprite;
  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    startX = event.clientX;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    frame += (event.clientX - startX) / 7;
    frame = Math.max(0, Math.min(frameCount - 1, frame));
    startX = event.clientX;
    draw();
  });
  const release = () => { dragging = false; stage.classList.remove('is-dragging'); };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    frame += event.key === 'ArrowLeft' ? -1 : 1;
    frame = Math.max(0, Math.min(frameCount - 1, frame));
    draw();
  });
})();
