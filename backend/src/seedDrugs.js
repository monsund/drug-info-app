// src/seedDrugs.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, disconnectDB } from './db/mongo.js';
import Drug from './models/drug.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDrugs() {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Read JSON file
    const filePath = path.join(__dirname, 'data', 'drugData.json');
    const raw = fs.readFileSync(filePath, 'utf-8');

    const drugs = JSON.parse(raw);

    if (!Array.isArray(drugs)) {
      throw new Error('drugData.json must contain an array');
    }

    console.log(`Loaded ${drugs.length} records from JSON`);

    // 3. Optional: clear existing data
    await Drug.deleteMany({});
    console.log('Cleared existing documents in "drugs" collection');

    // 4. Insert new data
    const inserted = await Drug.insertMany(drugs);
    console.log(`Inserted ${inserted.length} drugs into MongoDB`);
  } catch (err) {
    console.error('Error seeding drugs:', err);
  } finally {
    await disconnectDB();
    // Exit process explicitly so script ends
    process.exit(0);
  }
}

seedDrugs();
