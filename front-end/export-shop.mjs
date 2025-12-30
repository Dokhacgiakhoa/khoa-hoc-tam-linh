import { SHOP_PRODUCTS } from './src/data/shop-product-data.js';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('../back-end/database/data/products.json');
fs.writeFileSync(outputPath, JSON.stringify(SHOP_PRODUCTS, null, 2), 'utf8');
console.log(`Exported products to ${outputPath}`);
