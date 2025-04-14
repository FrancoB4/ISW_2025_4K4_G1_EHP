import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para usar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawData = fs.readFileSync(path.join(__dirname, './config.json'), 'utf-8');
const config = JSON.parse(rawData);

export default config;