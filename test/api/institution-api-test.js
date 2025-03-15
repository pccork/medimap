import { EventEmitter } from "events";
import { assert } from "chai";
import { medimapService } from "./medimap-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, cuh, testInstitutions } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Institution API tests", () => {
  let user = null;

  setup(async () => {
    await medimapService.deleteAllInstitutions();
    await medimapService.deleteAllUsers();
    user = await medimapService.createUser(maggie);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create institution", async () => {
    const returnedInstitution = await medimapService.createInstitution(cuh);
    assert.isNotNull(returnedInstitution);
    assertSubset(mozart, returnedInstitution);
  });

  test("delete a institution", async () => {
    const institution = await medimapService.createInstitution(cuh);
    const response = await medimapService.deleteInstitution(institution._id);
    assert.equal(response.status, 204);
    try {
      const returnedInstitution = await medimapService.getInstitution(institution.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Institution with this id", "Incorrect Response Message");
    }
  });

  test("create multiple institutions", async () => {
    for (let i = 0; i < testInstitutions.length; i += 1) {
      testInstitutions[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await medimapService.createInstitution(testInstitutions[i]);
    }
    let returnedLists = await medimapService.getAllInstitutions();
    assert.equal(returnedLists.length, testInstitutions.length);
    await medimapService.deleteAllInstitutions();
    returnedLists = await medimapService.getAllInstitutions();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant institution", async () => {
    try {
      const response = await medimapService.deleteInstitution("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Institution with this id", "Incorrect Response Message");
    }
  });
});