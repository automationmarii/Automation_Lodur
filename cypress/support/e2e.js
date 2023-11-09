// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// ignore all console errors in app
// eslint-disable-next-line no-unused-vars

import "cypress-wait-until";
import "cypress-mochawesome-reporter/register";
import "cypress-iframe";

/**
 * Visits a URL with authentication credentials using Cypress.
 *
 * @param {string} relativeUrl - The relative URL to visit.
 * @throws {Error} Throws an error if authentication credentials are missing in `Cypress.env()`.
 */
Cypress.Commands.add("visitWithAuth", (relativeUrl) => {
  const { app_username, app_passowrd } = Cypress.env();
  cy.visit(relativeUrl, {
    auth: {
      username: app_username,
      password: app_passowrd,
    },
  });
});

/**
 * Generates a random string of the specified length containing alphanumeric characters.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {Cypress.Chainable<string>} A Cypress chainable containing the generated random string.
 */
Cypress.Commands.add("generateRandomString", (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return cy.wrap(result);
});

/**
 * Generates a random date details object representing a date 20 years ago from the current date.
 *
 * @returns {Cypress.Chainable<{ date: string, month: string, year: string }>} A Cypress chainable containing the generated date details object.
 */
Cypress.Commands.add("getRandomDateDetails", () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const currentDateValue = String(currentDate.getDate()).padStart(2, "0");

  const yearBefore20Years = currentYear - 20;

  const dateDetails = {
    date: currentDateValue,
    month: currentMonth,
    year: yearBefore20Years,
  };

  return cy.wrap(dateDetails);
});

/**
 * Verifies the background color of a specified element against an expected color.
 *
 * @param {string} fieldSelector - The CSS selector of the element to verify.
 * @param {string} expectedColor - The expected background color in the CSS format (e.g., 'rgb(255, 255, 255)').
 */
Cypress.Commands.add(
  "verifyBackgroundColor",
  (fieldSelector, expectedColor) => {
    cy.get(fieldSelector).should("have.css", "background-color", expectedColor);
  }
);
