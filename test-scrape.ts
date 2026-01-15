import 'dotenv/config';
import { CompanyResearcher } from './src/scraper';

async function test() {
  console.log('Starting test scrape for Shopify...\n');

  const researcher = new CompanyResearcher(true); // verbose mode

  try {
    console.log('Initializing Stagehand...');
    await researcher.initialize();
    console.log('✓ Initialization complete\n');

    console.log('Starting research...');
    const report = await researcher.research('Shopify');

    console.log('\n=== RESULTS ===');
    console.log(JSON.stringify(report, null, 2));

    await researcher.close();
    console.log('\n✓ Complete');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

test();
