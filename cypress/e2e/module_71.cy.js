import Module_71 from "../pageObjects/module_71/module_71";
import Module_9 from "../pageObjects/module_9/module_9";
describe("Module_71", () => {
  before(() => {
    Module_9.loginLodur();
    Module_71.visitModule_71();
  });
  it("Capture Person", () => {
    const data = {
      personName: `Auto_Name${Cypress._.random(1000, 100000)}`,
      personSurName: `Auto_SurNameName${Cypress._.random(1000, 100000)}`,
      randomGrad: 1,
      randomGender: Cypress._.random(1, 3),
      randomStrasse: `RandomStrasse${Cypress._.random(1000, 10000)}`,
      randomPLZ: `${Cypress._.random(1000, 99999)}`,
      randomOrt: `ORT${Cypress._.random(100, 10000)}`,
      dateDetails: { date: "16", month: "09", year: 2000 },
    };

    Module_71.capturePerson(data);
    Module_71.clickSpichermanBtnButton();
    Module_71.verifyMandatoryFieldsInPersonForm();
    Module_71.fillMandatoryFieldsInPersonForm(data);
    Module_71.clickSpichermanBtnButton();
    Module_71.verifysuccessMessageofAddingPersion();
    Module_71.clickPersonDetailFormCloseBtn();
    Module_71.verifyAddedPersonDataInTable(data);
  });
});
