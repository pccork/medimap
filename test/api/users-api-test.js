import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { medimapService } from "./medimap-service.js";
import { maggie, testUsers, maggieCredentials } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    medimapService.clearAuth();
    await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    await medimapService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await medimapService.createUser(testUsers[i]);
    }
    await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await medimapService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await medimapService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await medimapService.deleteAllUsers();
    await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    returnedUsers = await medimapService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await medimapService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await medimapService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await medimapService.deleteAllUsers();
    await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    try {
      const returnedUser = await medimapService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

