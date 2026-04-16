
const remedyDetails = {
  haldi: {
    title: 'Haldi — The Golden Healer',
    desc: 'Turmeric, sandalwood, and rose in a simple paste for glow and calm.',
    tips: 'Mix with rose water, leave for 10 minutes, then rinse cool.',
  },
  neem: {
    title: 'Neem — Clarifying Leaf Mask',
    desc: 'Neem, tulsi, and multani mitti to soothe angry skin.',
    tips: 'Spot treat or use as a thin layer; rinse before it fully dries.',
  },
  rice: {
    title: 'Rice — Cloud Polish',
    desc: 'Finely ground rice with milk and honey for gentle weekly polishing.',
    tips: 'Keep it creamy, not dry; massage lightly and then rinse.',
  },
  besan: {
    title: 'Besan — Rose Soothe',
    desc: 'Chickpea flour with rose water and yogurt to even tone.',
    tips: 'Great for sensitive days; rinse before it cracks.',
  },
  saffron: {
    title: 'Saffron — Dawn Dew',
    desc: 'Saffron strands infused in almond milk for overnight luminosity.',
    tips: 'Press a few drops onto damp skin at night.',
  },
  tulsi: {
    title: 'Tulsi — Purifying Steam',
    desc: 'Holy basil leaves steeped for a clearing facial steam.',
    tips: 'Keep it gentle, then follow with a light moisturiser.',
  },
};

function showRemedy(remedyKey) {
  const display = document.getElementById('remedy-display');
  const data = remedyDetails[remedyKey];
  if (!display || !data) return;

  display.innerHTML = `
    <article class="remedy-card visible-card">
      <h2>${data.title}</h2>
      <p>${data.desc}</p>
      <div class="step-tip" role="note">${data.tips}</div>
    </article>
  `;

  display.classList.add('visible');
  display.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const viewButtons = Array.from(document.querySelectorAll('.view-btn'));
  const noResults = document.getElementById('no-results');


  if (filterButtons.length && cards.length) {
    const style = document.createElement('style');
    style.textContent = `
      [data-category] { transition: opacity 180ms ease, transform 180ms ease; }
      .is-hiding { opacity: 0; transform: translateY(4px); pointer-events: none; }
    `;
    document.head.appendChild(style);
    
    cards.forEach(card => {
      card.hidden = false;
      card.classList.remove('is-hiding');
    });

    function setActiveButton(activeBtn) {
      filterButtons.forEach(btn => {
        const isActive = btn === activeBtn;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    function hideCard(card) {
      card.classList.add('is-hiding');
      const onDone = () => {
        card.hidden = true;
        card.removeEventListener('transitionend', onDone);
      };
      card.addEventListener('transitionend', onDone);
    }

    function showCard(card) {
      card.hidden = false;
      requestAnimationFrame(() => card.classList.remove('is-hiding'));
    }

    function applyFilter(filter) {
      let visibleCount = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          showCard(card);
          visibleCount += 1;
        } else if (!card.hidden) {
          hideCard(card);
        }
      });
      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveButton(btn);
        applyFilter(btn.dataset.filter || 'all');
      });
    });
  }

  if (viewButtons.length) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.remedy;
        showRemedy(key);
      });
    });
  }
});
