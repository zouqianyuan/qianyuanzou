(function () {
  const grid = document.querySelector('.ambient-grid');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!grid || prefersReducedMotion) return;

  const columns = 14;
  const rows = 8;
  const fragment = document.createDocumentFragment();

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const bit = document.createElement('span');
      bit.className = 'ambient-bit';
      bit.setAttribute('aria-hidden', 'true');
      bit.textContent = Math.random() > 0.5 ? '1' : '0';
      bit.style.left = `${((column + 0.5) / columns) * 100}%`;
      bit.style.top = `${((row + 0.5) / rows) * 100}%`;
      bit.style.animationDelay = `${((row * columns + column) % 23) * 0.18}s`;
      fragment.appendChild(bit);
    }
  }

  grid.appendChild(fragment);
}());
