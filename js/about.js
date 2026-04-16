
document.addEventListener('DOMContentLoaded', () => {
  const observed = document.querySelectorAll('[data-observe]');
  const worldCards = document.querySelectorAll('.world-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observed.forEach(el => observer.observe(el));
  } else {
    observed.forEach(el => el.classList.add('is-visible'));
  }

  worldCards.forEach(card => {
    card.addEventListener('click', () => {
      worldCards.forEach(btn => {
        btn.classList.toggle('is-active', btn === card);
        btn.setAttribute('aria-pressed', String(btn === card));
      });
    });
  });
});
