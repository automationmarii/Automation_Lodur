export default (on, config) => {
  on("before:run", async (details) => {
    console.log("Override before:run");
    await beforeRunHook(details);
    // Note: if you are using other than Windows remove below two lines, start with await exec
    await exec(
      "IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots"
    );
    await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\test-reports");
    await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports");
  });

  on("after:run", async () => {
    console.log("Override after:run");
    // Note: if you are using other than Windows remove below line, starts with await exec
    await exec(
      "npx jrm ./cypress/reports/junitreport.xml ./cypress/test-reports/junit-report-[hash].xml"
    );
    await exec(
      "npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit-report-[hash].xml"
    );
    await afterRunHook();
  });
};
