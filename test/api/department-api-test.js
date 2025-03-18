import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { medimapService } from "./medimap-service.js";
import { maggie, cuh, testInstitutions, testDepartments, renal, maggieCredentials } from "../fixtures.js";

suite("Department API tests", () => {
  let user = null;
  let renalDepartment = null;

  setup(async () => {
    medimapService.clearAuth();
    user = await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    await medimapService.deleteAllInstitutions();
    await medimapService.deleteAllDepartments();
    await medimapService.deleteAllUsers();
    user = await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    cuh.userid = user._id;
    renalDepartment = await medimapService.createInstitution(cuh);
  });
  
  teardown(async () => {});

  test("create department", async () => {
    const returnedDepartment = await medimapService.createDepartment(renalDepartment._id, renal);
    assertSubset(renal, returnedDepartment);
  });

  test("create Multiple departments", async () => {
    for (let i = 0; i < testDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await medimapService.createDepartment(renalDepartment._id, testDepartments[i]);
    }
    const returnedDepartments = await medimapService.getAllDepartments();
    assert.equal(returnedDepartments.length, testDepartments.length);
    for (let i = 0; i < returnedDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const department = await medimapService.getDepartment(returnedDepartments[i]._id);
      assertSubset(department, returnedDepartments[i]);
    }
  });

  test("delete DepartmentApi", async () => {
    for (let i = 0; i < testDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await medimapService.createDepartment(renalDepartment._id, testDepartments[i]);
    }
    let returnedDepartments = await medimapService.getAllDepartments();
    assert.equal(returnedDepartments.length, testDepartments.length);
    for (let i = 0; i < returnedDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const department = await medimapService.deleteAllDepartments(returnedDepartments[i]._id);
    }
    returnedDepartments = await medimapService.getAllDepartments();
    assert.equal(returnedDepartments.length, 0);
  });

  test("denormalised department", async () => {
    for (let i = 0; i < testDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await medimapService.createDepartment(renalDepartment._id, testDepartments[i]);
    }
    const returnedInstitution = await medimapService.getInstitution(renalDepartment._id);
    assert.equal(returnedInstitution.departments.length, testDepartments.length);
    for (let i = 0; i < testDepartments.length; i += 1) {
      assertSubset(testDepartments[i], returnedInstitution.departments[i]);
    }
  });
});