// Import the environment-specific settings from config.js and cypress.env.json
import config from "../../../config.js";
//import { module9Element } from '../login/module_9.sel.js'; // Adjust the path
const module9Element = require("./module_9.sel.js");

class Module_9 {
  /**
   * Visits a page with a dynamically constructed URL based on the URL name, and waits for a specific element to become visible.
   * This function reads URLs from the `urls.json` fixture file, constructs the full URL by appending the relative URL to the base URL from `config.js`,
   * and then visits the URL with authentication. It also waits for a specified element (login form) to become visible on the page.
   *
   */
  visitModule_9() {
    // Read the URLs from the urls.json fixture file
    let urlName = "module_9";
    cy.fixture("urls.json").then((urls) => {
      // Check if the specified URL name exists in the URLs object
      if (!urls[urlName]) {
        throw new Error(`URL for urlName "${urlName}" not found.`);
      }

      // Get the baseURL from config.js
      const baseURL = config.baseURL;

      // Construct the full URL by appending the relative URL
      const relativeUrl = urls[urlName];
      const fullUrl = `${baseURL}${relativeUrl}`;

      // Use the custom command to visit the URL with authentication
      cy.visitWithAuth(fullUrl);
      cy.waitUntil(
        () => {
          return cy.get(module9Element.loginForm).should("be.visible");
        },
        {
          errorMsg: "Element never became visible",
          timeout: 10000,
          interval: 500,
        }
      );
    });
  }

  /**
   * Performs a login action using provided credentials and waits for the login success page to become visible.
   * This function retrieves login credentials from `cypress.env.json`, types the login member name and password,
   * clicks the login submit button, and waits for the login success page element to become visible.
   */
  login() {
    // Retrieve login credentials from cypress.env.json
    const { login_member_name, login_member_pwd } = Cypress.env();

    // Type the login member name and password
    cy.get(module9Element.loginMemberName).type(login_member_name);
    cy.get(module9Element.loginMemberPwd).type(login_member_pwd);

    // Click the login submit button
    cy.get(module9Element.loginSubmit).click();
    cy.waitUntil(
      () => {
        return cy.get(module9Element.loginSuccesPage).should("be.visible");
      },
      {
        errorMsg: "Element never became visible",
        timeout: 10000,
        interval: 500,
      }
    );
  }

  /**
   * Logs into the Lodur system by visiting the module_9 page and performing the login action.
   * This function first calls the `visitModule_9` function to ensure the login form is visible by visiting the page.
   * Then, it calls the `login` function to perform the actual login action.
   */
  loginLodur() {
    // Call the visitModule_9 function to visit the page and ensure the login form is visible
    this.visitModule_9();

    // Call the login function to perform the login action
    this.login();
  }
}

export default new Module_9();
