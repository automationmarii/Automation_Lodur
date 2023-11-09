// config.js

// Read environment variables from cypress.env.json
const environmentName = Cypress.env("environmentName");
const dynamicEnvironmentId = Cypress.env("dynamicEnvironmentId");

// Define environment-specific settings
const environments = {
  prod: {
    environmentName: "prod",
    baseDomain: "https://lodur-prod.ch",
  },
  dev: {
    environmentName: "dev",
    baseDomain: "https://lodur-dev.ch",
  },
  test2: {
    environmentName: "test2",
    baseDomain: "https://lodur-test2.ch",
  },
  // Add more environments as needed
};

// Get the selected environment from the environmentName in cypress.env.json
const selectedEnvironment = environments[environmentName || "dev"];

// Construct the baseURL including the path
const baseURL = `${selectedEnvironment.baseDomain}/dev_${dynamicEnvironmentId}_org`;

// Export the configuration
export default {
  ...Cypress.env(), // Include variables from cypress.env.json via Cypress config
  baseURL,
};
