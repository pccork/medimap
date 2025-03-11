import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testInstitutions, testDepartments, cuh, muh, renal, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Department Model tests", () => {
  let cuhList = null;

  setup(async () => {
    db.init("json");
    await db.institutionStore.deleteAllInstitutions();
    await db.departmentStore.deleteAllDepartments();
    cuhList = await db.institutionStore.addInstitution(cuh);
    for (let i = 0; i < testDepartments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDepartments[i] = await db.departmentStore.addDepartment(cuhList._id, testDepartments[i]);
    }
  });

  test("create single department", async () => {
    const muhList = await db.institutionStore.addInstitution(muh);
    const department = await db.departmentStore.addDepartment(muhList._id, renal);
    assert.isNotNull(department._id);
    assertSubset(renal, department);
  });

  test("create multiple departmentApi", async () => {
    const departments = await db.institutionStore.getInstitutionById(cuhList._id);
    assert.equal(testDepartments.length, testDepartments.length);
  });

  test("delete all departmentApi", async () => {
    const departments = await db.departmentStore.getAllDepartments();
    assert.equal(testDepartments.length, departments.length);
    await db.departmentStore.deleteAllDepartments();
    const newDepartments = await db.departmentStore.getAllDepartments();
    assert.equal(0, newDepartments.length);
  });

  test("get a department - success", async () => {
    const muhList = await db.institutionStore.addInstitution(muh);
    const department = await db.departmentStore.addDepartment(muhList._id, renal);
    const newDepartment = await db.departmentStore.getDepartmentById(department._id);
    assertSubset(renal, newDepartment);
  });

  test("delete One Department - success", async () => {
    await db.departmentStore.deleteDepartment(testDepartments[0]._id);
    const departments = await db.departmentStore.getAllDepartments();
    assert.equal(departments.length, testDepartments.length - 1);
    const deletedDepartment = await db.departmentStore.getDepartmentById(testDepartments[0]._id);
    assert.isNull(deletedDepartment);
  });

  test("get a department - bad params", async () => {
    assert.isNull(await db.departmentStore.getDepartmentById(""));
    assert.isNull(await db.departmentStore.getDepartmentById());
  });

  test("delete one department - fail", async () => {
    await db.departmentStore.deleteDepartment("bad-id");
    const departments = await db.departmentStore.getAllDepartments();
    assert.equal(departments.length, testInstitutions.length);
  });
});