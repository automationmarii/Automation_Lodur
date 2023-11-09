const fs = require("fs");
const { execSync } = require("child_process");

// Directory where your spec files are located
const specDirectory = "cypress/e2e";

// Count the number of spec files
const specFiles = fs
  .readdirSync(specDirectory)
  .filter((file) => file.endsWith(".cy.js"));

// Number of tests to run in each batch
const batchSize = 5;

// Split the spec files into batches
for (let i = 0; i < specFiles.length; i += batchSize) {
  const batch = specFiles.slice(i, i + batchSize);
  const batchSpecs = batch.map((spec) => `${specDirectory}/${spec}`).join(" ");

  try {
    // Run Cypress tests for the current batch
    execSync(
      `npm run clean && npx cypress-parallel -s cy:run -t ${batchSpecs} -d 'cypress/e2e/**/*.cy.js' -r 'cypress-mochawesome-reporter' -o 'cypressParallel=true' && npm run generate-report`
    );
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
}
