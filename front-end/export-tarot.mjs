import TarotData from './temp-data/tarot-main.js';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('../back-end/database/data/tarot.json');
fs.writeFileSync(outputPath, JSON.stringify(TarotData, null, 2), 'utf8');
console.log(`Exported tarot to ${outputPath}`);
