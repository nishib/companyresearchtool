import "dotenv/config";
import { Stagehand } from "@browserbasehq/stagehand";

async function main() {
  // Create Stagehand instance with BROWSERBASE or LOCAL environment
  const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
    ? "BROWSERBASE" as const
    : "LOCAL" as const;

  const stagehand = new Stagehand({
    env,
    apiKey: process.env.BROWSERBASE_API_KEY,
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    disablePino: true,
    disableAPI: true, // Force client-side extraction (API mode is unstable)
    model: process.env.GOOGLE_API_KEY ? {
      modelName: "gemini-2.0-flash", // Latest stable Gemini model supported by Stagehand
      apiKey: process.env.GOOGLE_API_KEY,
    } : undefined,
  });

  // Initialize Stagehand (required in V3)
  await stagehand.init();

  console.log(`\n✓ Stagehand Session Started (${env} mode)`);
  if (stagehand.browserbaseSessionID) {
    console.log(`Watch live: https://browserbase.com/sessions/${stagehand.browserbaseSessionID}\n`);
  }

  // Get the first page from context (available after init)
  const pages = stagehand.context.pages();
  if (!pages || pages.length === 0) {
    throw new Error('No page available in Stagehand context');
  }
  const page = pages[0];

  // Example 1: Navigate and extract
  console.log("1️⃣ Navigating to Stagehand.dev...");
  await page.goto("https://stagehand.dev");

  console.log("2️⃣ Extracting value proposition...");
  const extractResult = await stagehand.extract(
    "Extract the value proposition from the page."
  );
  console.log(`Extract result:\n`, extractResult);

  // Example 2: Act on the page
  console.log("\n3️⃣ Clicking the 'Evals' button...");
  await stagehand.act(
    "Click the 'Evals' button."
  );

  // Example 3: Observe elements
  console.log("\n4️⃣ Observing clickable elements...");
  const observeResult = await stagehand.observe(
    "What can I click on this page?"
  );
  console.log(`Observe result (${observeResult.length} elements found):\n`, observeResult.slice(0, 3));

  // Example 4: Use agent for autonomous browsing
  console.log("\n5️⃣ Creating AI agent...");
  const agent = stagehand.agent();

  console.log("6️⃣ Agent executing autonomous task...");
  const agentResult = await agent.execute("What is the most accurate model to use in Stagehand?");
  console.log(`Agent result:\n`, agentResult);

  await stagehand.close();
  console.log("\n✓ Session closed successfully\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
