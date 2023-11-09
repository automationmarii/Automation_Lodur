// Import the environment-specific settings from config.js and cypress.env.json
import config from "../../../config.js";
const module48Element = require("../module_48/module_48.sel.js");

class Module_48 {
  /**
   * Visits the Module 48 page and waits for a specific element to become visible.
   * This function performs the following steps:
   * 1. Reads the URL name from the "urls.json" fixture file.
   * 2. Checks if the specified URL name exists in the URLs object.
   * 3. Retrieves the baseURL from the "config.js" file.
   * 4. Constructs the full URL by appending the relative URL.
   * 5. Uses the custom command "cy.visitWithAuth()" to visit the URL with authentication.
   * 6. Waits until an element with the selector "module48Element.contentDetails" becomes visible.
   */
  visitModule_48() {
    let urlName = "module_48";
    cy.fixture("urls.json").then((urls) => {
      if (!urls[urlName]) {
        throw new Error(`URL for urlName "${urlName}" not found.`);
      }
      const baseURL = config.baseURL;
      const relativeUrl = urls[urlName];
      const fullUrl = `${baseURL}${relativeUrl}`;
      cy.visitWithAuth(fullUrl);
      cy.waitUntil(
        () => {
          return cy.get(module48Element.contentDetails).should("be.visible");
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
   * Sets up a work report by filling in activity, event, and work carried out details and clicking the "Submit" button.
   * This function performs the following steps:
   * 1. Destructures the properties `activity`, `event`, and `workCarriedOut` from the `data` object.
   * 2. Calls the `setupActivity()` function to set up the activity details.
   * 3. Calls the `setUpEvent()` function to set up the event details.
   * 4. Calls the `setupWorkCarriedOut()` function to set up the work carried out details.
   * 5. Calls the `clickSubmitBtn()` function to submit the work report.
   *
   * @param {Object} data - The data object containing activity, event, and workCarriedOut details.
   */

  setUpWorkReport(data) {
    const { activity, event, workCarriedOut } = data;

    this.setupActivity(activity);
    this.setUpEvent(event);
    this.setupWorkCarriedOut(workCarriedOut);
    this.clickSpichermanBtnBtn();
  }

  /**
   * Sets up the activity field by selecting the specified activity from the dropdown.
   * This function performs the following steps:
   * 1. Waits for the activity dropdown to be visible.
   * 2. Attempts to select the provided `activity` value from the dropdown.
   * 3. Verifies that the selected `activity` value appears in the dropdown.
   * 4. Retries the selection and verification up to 3 times in case of failure.
   *
   * @param {string} activity - The activity value to select from the dropdown.
   */

  setupActivity(activity) {
    cy.get(module48Element.activity)
      .should("be.visible")
      .then(($dropdown) => {
        let retryAttempts = 3;

        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            // Click on the dropdown to open it
            cy.wrap($dropdown).select(activity);

            cy.waitUntil(
              () => {
                return cy.wrap($dropdown).should("contain", activity);
              },
              {
                errorMsg: `Selected value '${activity}' not selected in the dropdown`,
                timeout: 10000,
                interval: 500,
              }
            );

            break;
          } catch (error) {
            if (attempt === retryAttempts) {
              throw error;
            } else {
              cy.wait(1000);
            }
          }
        }
      });
  }

  /**
   * Sets up the Event input field by filling it with the provided `event` value.
   * This function performs the following steps:
   * 1. Waits for the Event input field to be visible.
   * 2. Attempts to fill the input field with the provided `event` value.
   * 3. Verifies that the input field contains the specified `event` value.
   * 4. Retries the filling and verification up to 3 times in case of failure.
   *
   * @param {string} event - The event value to fill in the input field.
   */

  setUpEvent(event) {
    cy.get(module48Element.event)
      .should("be.visible")
      .then(($input) => {
        let retryAttempts = 3;
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            cy.wrap($input).type(event);
            cy.waitUntil(
              () => {
                return cy.wrap($input).should("have.value", event);
              },
              {
                errorMsg: "Value was never set in the Event input field",
                timeout: 10000,
                interval: 500,
              }
            );

            break;
          } catch (error) {
            if (attempt === retryAttempts) {
              throw error;
            } else {
              cy.wait(1000);
            }
          }
        }
      });
  }

  /**
   * Sets up the Work Carried Out input field inside an iframe by filling it with the provided `randomValue`.
   *
   * @param {string} randomValue - The value to type into the Work Carried Out input field.
   */
  setupWorkCarriedOut(randomValue) {
    cy.get("iframe#ausgef_arbeit_ifr").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("p").type(randomValue);
    });
  }

  /**
   * Clicks the Spicherman Button with retries and waits for the ADF form main cell to become visible.
   */
  clickSpichermanBtnBtn() {
    let retryAttempts = 3;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        cy.get(module48Element.spichermanBtn).should("be.visible");
        cy.get(module48Element.spichermanBtn).click({ force: true });

        cy.waitUntil(
          () => {
            return cy.get(module48Element.adfFormMainCell).should("be.visible");
          },
          {
            errorMsg: "Element spichermanBtn never became visible",
            timeout: 10000,
            interval: 500,
          }
        );

        break;
      } catch (error) {
        if (attempt === retryAttempts) {
          throw error;
        } else {
          cy.wait(1000);
        }
      }
    }
  }

  /**
   * Clicks the Add Button with retries and waits for the default table to become visible.
   */
  clickAddBtn() {
    let retryAttempts = 3;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        cy.get(module48Element.addBtn).should("be.visible");
        cy.get(module48Element.addBtn).click({ force: true });

        cy.waitUntil(
          () => {
            return cy.get(module48Element.defaultTable).should("be.visible");
          },
          {
            errorMsg: "Element spichermanBtn never became visible",
            timeout: 10000,
            interval: 500,
          }
        );

        break;
      } catch (error) {
        if (attempt === retryAttempts) {
          throw error;
        } else {
          cy.wait(1000);
        }
      }
    }
  }

  /**
   * Randomly selects a specified number of rows from a table, checks their checkboxes, and returns their data.
   *
   * @param {number} count - The number of rows to randomly select.
   * @returns {Promise<Array<Object>>} - An array of objects representing the selected rows' data.
   * Each object contains 'name' and 'vorName' properties.
   * @throws {Error} - Throws an error if there are not enough rows to select.
   */
  addPeople(count) {
    return cy.get("table#appellliste tbody tr").then(($rows) => {
      const rowCount = $rows.length;

      if (rowCount < count) {
        throw new Error("There are not enough rows to select.");
      }

      const randomIndices = [];
      while (randomIndices.length < count) {
        const randomIndex = Cypress._.random(0, rowCount - 1);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const selectedData = randomIndices.map((randomIndex) => {
        const $row = $rows.eq(randomIndex);
        cy.wrap($row).find("input[type='checkbox']").should("exist");
        cy.wrap($row).find("input[type='checkbox']").check();

        const nameCell = $row.find("td:eq(2)").text().trim();
        const vorNameCell = $row.find("td:eq(3)").text().trim();
        const selectedObject = {
          name: nameCell,
          vorName: vorNameCell,
        };

        return selectedObject;
      });
      this.clickAddBtn();
      return Cypress.Promise.all(selectedData);
    });
  }

  /**
   * Verifies that the selected values are present in the specified table's tbody.
   *
   * @param {Array<Object>} selectedValues - An array of objects representing the values to be verified.
   * Each object should contain 'name' and 'vorName' properties.
   */
  verifyAddedPeopleInTable(selectedValues) {
    selectedValues.forEach((selectedObject) => {
      cy.get("table#default tbody")
        .eq(0)
        .contains(selectedObject.name)
        .should("be.visible")
        .contains(selectedObject.vorName)
        .should("be.visible");
    });
  }
}

export default new Module_48();
