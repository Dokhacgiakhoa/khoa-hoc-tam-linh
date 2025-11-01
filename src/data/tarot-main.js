// src/data/tarot-main.js
import tarotMajor from "./tarot-major";
import tarotWands from "./tarot-wands";
import tarotSwords from "./tarot-swords";
import tarotCups from "./tarot-cups";
import tarotPentacles from "./tarot-pentacles";

const TarotData = [
  ...tarotMajor,
  ...tarotWands,
  ...tarotSwords,
  ...tarotCups,
  ...tarotPentacles,
];

export default TarotData;
