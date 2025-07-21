import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { portfolios } from '../src/lib/schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function importCSV() {
  try {
    // Create database connection
    const connectionString = process.env.DATABASE_URL!;
    const client = postgres(connectionString);
    const db = drizzle(client);
    
    // Read the CSV file
    const csvContent = readFileSync('../../Interview_dataset(in)(in).csv', 'utf-8');
    
    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log(`Found ${records.length} records to import`);

    // Transform and insert data in batches
    const batchSize = 100;
    let imported = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      
      const transformedBatch = batch.map((record: any) => ({
        memberName: record['Member Name'],
        username: record['Username'],
        numPortfolios: parseInt(record['No. Of Portfolios']) || 0,
        idVerification: record['ID Verification'],
        portfolioVerification: record['Portfolio Verification'],
        location: record['Location'],
        sizeKB: parseFloat(record['Size (KB)']).toString(),
        subscription: record['Subscription'],
      }));

      await db.insert(portfolios).values(transformedBatch);
      imported += transformedBatch.length;
      console.log(`Imported ${imported}/${records.length} records`);
    }

    console.log('CSV import completed successfully!');
    await client.end();
  } catch (error) {
    console.error('Error importing CSV:', error);
  }
}

importCSV(); 