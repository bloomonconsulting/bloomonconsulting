// Minimal behavior for Bloom On Consulting
// - Expand/collapse value cards on the About page

document.addEventListener('DOMContentLoaded', () => {
  // Values cards: toggle open/closed on click
  const valueCards = document.querySelectorAll('.value-card');

  valueCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
});
