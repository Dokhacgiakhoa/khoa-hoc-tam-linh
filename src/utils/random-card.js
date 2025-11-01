// src/utils/random-card.js
export function randomCard(cards) {
  if (!cards || cards.length === 0) return null;
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
}
