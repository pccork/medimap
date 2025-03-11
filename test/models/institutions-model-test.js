import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testInstitutions, cuh } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


EventEmitter.setMaxListeners(25);

suite("Institution Model tests", () => {

  setup(async () => {
    db.init("json"); // changed in lab 5
    await db.institutionStore.deleteAllInstitutions();
    for (let i = 0; i < testInstitutions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testInstitutions[i] = await db.institutionStore.addInstitution(testInstitutions[i]);
    }
  });

  test("create a institution", async () => {
    const institution = await db.institutionStore.addInstitution(cuh);
    assert.equal(cuh, institution);
    assert.isDefined(institution._id);
  });

  test("delete all institutions", async () => {
    let returnedInstitutions = await db.institutionStore.getAllInstitutions();
    assert.equal(returnedInstitutions.length, 3);
    await db.institutionStore.deleteAllInstitutions();
    returnedInstitutions = await db.institutionStore.getAllInstitutions();
    assert.equal(returnedInstitutions.length, 0);
  });

  test("get a institution - success", async () => {
    const institution = await db.institutionStore.addInstitution(cuh);
    const returnedInstitution = await db.institutionStore.getInstitutionById(institution._id);
    // assert.equal(cuh, institution);  lab 5
    assertSubset(cuh, institution);
  });

  test("delete One Institution - success", async () => {
    const id = testInstitutions[0]._id;
    await db.institutionStore.deleteInstitutionById(id);
    const returnedInstitutions = await db.institutionStore.getAllInstitutions();
    assert.equal(returnedInstitutions.length, testInstitutions.length - 1);
    const deletedInstitution = await db.institutionStore.getInstitutionById(id);
    assert.isNull(deletedInstitution);
  });

  test("get a institution - bad params", async () => {
    assert.isNull(await db.institutionStore.getInstitutionById(""));
    assert.isNull(await db.institutionStore.getInstitutionById());
  });

  test("delete One Institution - fail", async () => {
    await db.institutionStore.deleteInstitutionById("bad-id");
    const allInstitutions = await db.institutionStore.getAllInstitutions();
    assert.equal(testInstitutions.length, allInstitutions.length);
  });
});
