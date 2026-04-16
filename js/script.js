const facts = [
  'Turmeric has natural anti-inflammatory properties.',
  'Neem is often used to calm stubborn breakouts.',
  'Rice water has been used for centuries to soften skin.',
  'Cool aloe gel can soothe minor burns.',
];

const moodMap = {
  dry: 'Try a simple mix of aloe and honey — something that adds moisture without irritation.',
  acne: 'Neem works well here — keep it simple and consistent.',
  dull: 'A gentle haldi and yogurt mix can help bring back some glow.',
  sensitive: 'Stick to aloe or sandalwood — nothing too strong.'
};

function showFact() {
  const factText = document.getElementById('fact-text');
  if (!factText) return;
  const next = facts[Math.floor(Math.random() * facts.length)];
  factText.textContent = next;
}

document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = Array.from(document.querySelectorAll('[data-mood]'));
    const moodResult = document.getElementById('mood-result');

    const factBtn = document.getElementById('fact-next');
    if (factBtn) {
        factBtn.addEventListener('click', showFact);
    }

    if (moodButtons.length && moodResult) {
        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.dataset.mood;
                moodResult.textContent = moodMap[mood];

                moodButtons.forEach(b => {
                    const isActive = b === btn;
                    b.classList.toggle('active', isActive);
                    b.setAttribute('aria-pressed', String(isActive));
                });
            });
        });
    }
    showFact();
});


