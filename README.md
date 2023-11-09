# Loadur Test Automation

Test script which covers the current Lodur application scenarios using Cypress.

## Prerequisite

- Access to the Lodur environment being tested.
- Node JS v18.X
- Cypress verison as per the `package.json` file.

## Cypress Installation & Project setup

### Install the tests

1. Download Node & NPM (<https://nodejs.org/en/download/>)

2. Set `NODE_HOME` Environment Variable

   1. Go to Control Panel\System and Security\System
   2. Click Environment Variables > System Variables> New
   3. Set Variable name: for ex: `Node_HOME`
   4. Set Variable value – Specify the location where exactly node js is installed.

3. In a shell, `cd` to the folder where you want to get the smoke test and get the test from source control:
   `git clone https://github.com/automationmarii/Automation_Lodur.git`

4. `cd Automation_Lodur`

5. `git pull`

6. Run: `npm install` (Note: This step can be run to update the installed libraries at any time)

### Run a Text Suite

Run one of the following commands:

#### Run All the Specs by browser wise

- `npm run test-headles` # to run the e2e full specs in headless mode in Chrome browser.
- `npm run test-headed` # to run the e2e full specs in headed mode in Chrome browser.

#### Run Particular spec From e2e

For Ex if the specname is "module_48.cy.js"

Then command

- `npm run spec-headed -- --spec "cypress/e2e/module_48.cy.js"` # to run the particular spec in headed mode in Chrome browser.

- `npm run spec-headles -- --spec "cypress/e2e/module_48.cy.js"` # to run the particular spec in headeles mode

## Output

Cypress will return the following return code when running from the command line:
0: Success
1: One-or-more tests failed

From bash, you can see the result with:

```bash
echo $?
```

### Example Success Output

```Output



    Spec                                         Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  module_48.cy.js                    00:35     1        1        -        -      -    │
  └────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                  00:35     1        1        -        -      -


```
