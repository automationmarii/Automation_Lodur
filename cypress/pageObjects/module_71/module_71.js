// Import the environment-specific settings from config.js and cypress.env.json
import config from "../../../config.js";
const module71Element = require("../module_71/module_71.sel.js");

class Module_71 {
  /**
   * Visit a page- Module71- with a dynamically constructed URL based on the URL name.
   */
  visitModule_71() {
    // Read the URLs from the urls.json fixture file
    let urlName = "module_71";
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
          return cy.get(module71Element.generalInfo).should("be.visible");
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
   * Captures person details on the Manchester page.
   *
   * @param {object} data - The data containing person information.
   * @param {string} data.personName - The name of the person.
   * @param {string} data.personSurName - The surname of the person.
   * @param {string} data.dateDetails - The birth date details of the person.
   */
  capturePerson(data) {
    const { personName, personSurName, dateDetails } = data;

    this.clickManchestAddBtn();
    this.selectUnknownAhvnew();
    this.setUpName(personName);
    this.setUpVarName(personSurName);
    this.setUpBirthDetails(dateDetails);
    this.clickWeiverBtn();
  }

  /**
   * Clicks the "Manchester Add" button with retry logic.
   * This function retries clicking the button in case of failure for a specified number of attempts.
   * If all retry attempts fail, it throws an error to fail the test.
   */
  clickManchestAddBtn() {
    let retryAttempts = 3; // Set the number of retry attempts
    cy.get(module71Element.manchestAdd)
      .should("be.visible")
      .then(($element) => {
        // Use a loop to retry clicking the element
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            // Click the element
            cy.wrap($element).click({ force: true });
            cy.waitUntil(
              () => {
                return cy
                  .get(module71Element.editDialouge)
                  .should("be.visible");
              },
              {
                errorMsg: "Element ManchestAddBtn never became visible",
                timeout: 10000,
                interval: 500,
              }
            );
            break; // Exit the loop if the click is successful
          } catch (error) {
            if (attempt === retryAttempts) {
              // If all retry attempts failed, fail the test

              throw error;
            } else {
              // Wait for a while before retrying
              cy.wait(1000); // Adjust the wait time as needed
            }
          }
        }
      });
  }
  /**
   * Selects the "Unknown AHVNEW" checkbox with retry logic.
   * This function retries checking the checkbox and verifying its selection in case of failure for a specified number of attempts.
   * If all retry attempts fail, it throws an error to fail the test.
   */
  selectUnknownAhvnew() {
    let retryAttempts = 3; // Set the number of retry attempts

    cy.get(module71Element.unknownCheckBox)
      .should("be.visible")
      .then(($checkbox) => {
        // Use a loop to retry checking the checkbox and verifying its selection
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            // Check the checkbox
            cy.wrap($checkbox).check();

            // Wait until the checkbox is selected (checked)
            cy.waitUntil(
              () => {
                return cy.wrap($checkbox).should("be.checked");
              },
              {
                errorMsg: "Checkbox was never selected",
                timeout: 10000,
                interval: 500,
              }
            );

            break; // Exit the loop if the check is successful and verification passes
          } catch (error) {
            if (attempt === retryAttempts) {
              // If all retry attempts failed, fail the test
              throw error;
            } else {
              // Wait for a while before retrying
              cy.wait(1000); // Adjust the wait time as needed
            }
          }
        }
      });
  }

  /**
   * Sets up the "Name" input field with a provided random value, using retry logic.
   * This function retries filling the input field with the provided value and verifies its presence in the field for a specified number of attempts.
   * If all retry attempts fail, it throws an error to fail the test.
   *
   * @param {string} randomValue - The random value to set in the "Name" input field.
   */
  setUpName(randomValue) {
    cy.get(module71Element.nameFiled)
      .should("be.visible")
      .then(($input) => {
        let retryAttempts = 3; // Set the number of retry attempts
        // Use a loop to retry filling the input field
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            // Fill the input field with the random value
            cy.wrap($input).type(randomValue);

            // Wait until the value is present in the input field
            cy.waitUntil(
              () => {
                return cy.wrap($input).should("have.value", randomValue);
              },
              {
                errorMsg: "Value was never set in the Name input field",
                timeout: 10000,
                interval: 500,
              }
            );

            break; // Exit the loop if the fill and verification are successful
          } catch (error) {
            if (attempt === retryAttempts) {
              // If all retry attempts failed, fail the test
              throw error;
            } else {
              // Wait for a while before retrying
              cy.wait(1000); // Adjust the wait time as needed
            }
          }
        }
      });
  }

  /**
   * Sets up the "Variable Name" input field with a provided random value, using retry logic.
   * This function retries filling the input field with the provided value and verifies its presence in the field for a specified number of attempts.
   * If all retry attempts fail, it throws an error to fail the test.
   *
   * @param {string} randomValue - The random value to set in the "Variable Name" input field.
   */
  setUpVarName(randomValue) {
    cy.get(module71Element.varNameField)
      .should("be.visible")
      .then(($input) => {
        let retryAttempts = 3; // Set the number of retry attempts

        // Use a loop to retry filling the input field
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
          try {
            // Fill the input field with the random value
            cy.wrap($input).type(randomValue);

            // Wait until the value is present in the input field
            cy.waitUntil(
              () => {
                return cy.wrap($input).should("have.value", randomValue);
              },
              {
                errorMsg: "Value was never set in the Name input field",
                timeout: 10000,
                interval: 500,
              }
            );
            break; // Exit the loop if the fill and verification are successful
          } catch (error) {
            if (attempt === retryAttempts) {
              // If all retry attempts failed, fail the test
              throw error;
            } else {
              // Wait for a while before retrying
              cy.wait(1000); // Adjust the wait time as needed
            }
          }
        }
      });
  }

  /**
   * Sets up the birth date details by filling the day, month, and year fields with provided values.
   *
   * @param {object} dateDetails - The date details object.
   * @param {string} dateDetails.date - The day value.
   * @param {string} dateDetails.month - The month value.
   * @param {string} dateDetails.year - The year value.
   */
  setUpBirthDetails(dateDetails) {
    const { date, month, year } = dateDetails;
    // Fill day, month, and year fields
    cy.get(module71Element.birthDayFiled).type(date);
    cy.get(module71Element.birthMonth).type(month);
    cy.get(module71Element.birthYear).type(year);
  }

  /**
   * Clicks the "Weiter" (Continue) button with retry logic.
   * This function retries clicking the button in case of failure for a specified number of attempts.
   * If all retry attempts fail, it throws an error to fail the test.
   */
  clickWeiverBtn() {
    let retryAttempts = 3; // Set the number of retry attempts

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        cy.get(module71Element.weiterBtn).eq(0).should("be.visible");
        // Get all elements matching the locator
        cy.get(module71Element.weiterBtn).eq(0).click({ force: true }); // Click the first element

        cy.waitUntil(
          () => {
            return cy
              .get(module71Element.personDetailForm)
              .should("be.visible");
          },
          {
            errorMsg: "Element #personalblaetter never became visible",
            timeout: 10000, // Adjust the timeout as needed (in milliseconds)
            interval: 500, // Adjust the interval between checks as needed (in milliseconds)
          }
        );

        break; // Exit the loop if the click is successful
      } catch (error) {
        if (attempt === retryAttempts) {
          // If all retry attempts failed, fail the test
          throw error;
        } else {
          // Wait for a while before retrying
          cy.wait(1000); // Adjust the wait time as needed
        }
      }
    }
  }

  /**
   * Clicks the "Spicherman" button with a forceful click.
   * This function clicks the button using the `{ force: true }` option to bypass any obstructions.
   */
  clickSpichermanBtnButton() {
    cy.get(module71Element.spichermanBtn).should("be.visible");
    cy.get(module71Element.spichermanBtn).click({ force: true });
  }

  /**
   * Clicks the close button of the person detail form with a forceful click.
   * This function clicks the close button using the `{ force: true }` option to bypass any obstructions.
   * Additionally, it waits for 5 seconds after clicking. because saved data taking little time to load in the table
   */
  clickPersonDetailFormCloseBtn() {
    cy.get(module71Element.personDetailFormCloseBtn).click({ force: true });
    cy.wait(5000);
  }

  /**
   * Fills the mandatory fields in the person form with provided data.
   *
   * @param {object} data - The data containing values for filling the form.
   * @param {string} data.randomGrad - The random graduation value to select.
   * @param {number} data.randomGender - The random gender index (0 for male, 1 for female).
   * @param {string} data.randomStrasse - The random street address value.
   * @param {string} data.randomPLZ - The random postal code value.
   * @param {string} data.randomOrt - The random city/town value.
   * @param {object} data.dateDetails - The date details object.
   * @param {string} data.dateDetails.date - The day value.
   * @param {string} data.dateDetails.month - The month value.
   * @param {string} data.dateDetails.year - The year value.
   */
  fillMandatoryFieldsInPersonForm(data) {
    const {
      randomGrad,
      randomGender,
      randomStrasse,
      randomPLZ,
      randomOrt,
      dateDetails,
    } = data;

    cy.get(module71Element.gradField).select(randomGrad);
    cy.get(module71Element.genderField)
      .eq(randomGender - 1)
      .click({ force: true });
    cy.get(module71Element.strasseFiled).type(randomStrasse);
    cy.get(module71Element.plzField).type(randomPLZ);
    cy.get(module71Element.ortField).type(randomOrt);

    // Access the values from dateDetails object
    const { date, month, year } = dateDetails;

    // Fill day, month, and year fields
    cy.get(module71Element.entrittFieldDate1).type(date);
    cy.get(module71Element.entrittFieldDate2).type(month);
    cy.get(module71Element.entrittFieldDate3).type(year);
  }

  /**
   * Verifies the mandatory fields in the person form by checking their background colors.
   * This function iterates through a list of expected mandatory fields and their corresponding background colors.
   * It checks if the fields have the expected background color and reports any missing mandatory fields.
   */
  verifyMandatoryFieldsInPersonForm() {
    try {
      cy.get(module71Element.personForm).within(() => {
        // Define the list of expected mandatory field IDs and their corresponding background color
        const mandatoryFieldData = [
          {
            fieldId: module71Element.gradField,
            expectedColor: "rgb(255, 255, 255)",
          },
          {
            fieldId: module71Element.genderField,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.strasseFiled,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.plzField,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.ortField,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.entrittFieldDate1,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.entrittFieldDate2,
            expectedColor: "rgb(235, 129, 129)",
          },
          {
            fieldId: module71Element.entrittFieldDate3,
            expectedColor: "rgb(235, 129, 129)",
          },
          // Add more field IDs and colors as needed
        ];

        // Iterate through all mandatory fields and verify their background color
        mandatoryFieldData.forEach(({ fieldId, expectedColor }) => {
          cy.get(fieldId).should("have.css", "background-color", expectedColor);
        });

        // Check for missing mandatory fields
        const missingMandatoryFields = mandatoryFieldData.filter(
          ({ fieldId }) => {
            const field = cy.get(fieldId);
            return field.length === 0;
          }
        );

        if (missingMandatoryFields.length > 0) {
          const missingFieldIds = missingMandatoryFields.map(
            ({ fieldId }) => fieldId
          );
          throw new Error(
            `The following mandatory fields are missing: ${missingFieldIds.join(
              ", "
            )}`
          );
        }
      });
    } catch (error) {
      if (
        error.message.includes("background color") ||
        error.message.includes("missing mandatory fields")
      ) {
        cy.log(`Error: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  /**
   * Verifies the success message of adding a person by checking its background color and text content.
   * This function ensures that the success message has the expected background color and text content.
   * Additionally, it waits for 5 seconds after verification. because form data loading after that (adjust the wait time as needed).
   */
  verifysuccessMessageofAddingPersion() {
    cy.get(module71Element.successMessage)
      .should("have.css", "background-color", "rgb(68, 204, 68)")
      .then((value) => {
        expect(value.text()).to.equal("Speichern erfolgreichhhhh");
      });
    cy.wait(5000);
  }

  /**
   * Verifies that the added person's data, including the person's name, is present and visible in the specified table.
   *
   * @param {object} expectedData - The expected data for the added person.
   * @param {string} expectedData.personName - The expected person's name to verify.
   */
  verifyAddedPersonDataInTable(expectedData) {
    const { personName } = expectedData;
    cy.get(module71Element.personDetailTable)
      .contains(".name", personName)
      .should("be.visible");
  }
}

export default new Module_71();
