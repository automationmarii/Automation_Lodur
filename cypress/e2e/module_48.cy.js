import Module_48 from "../pageObjects/module_48/module_48";
import Module_9 from "../pageObjects/module_9/module_9";

describe("Module_48", () => {
  before(() => {
    Module_9.loginLodur();
    Module_48.visitModule_48();
  });

  it("Add People", { timeout: 80000 }, () => {
    const data = {
      activity: "Einsatz",
      event: `Auto_Event${Cypress._.random(1000, 100000)}`,
      workCarriedOut: `Auto_WorkCarriedOut${Cypress._.random(1000, 100000)}`,
    };

    Module_48.setUpWorkReport(data);

    Module_48.addPeople(2).then((selectedValues) => {
      Module_48.verifyAddedPeopleInTable(selectedValues);
    });
  });
});
