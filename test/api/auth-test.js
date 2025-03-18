import { assert } from "chai";
import { medimapService } from "./medimap-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    medimapService.clearAuth();
    await medimapService.createUser(maggie);
    await medimapService.authenticate(maggieCredentials);
    await medimapService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await medimapService.createUser(maggie);
    const response = await medimapService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await medimapService.createUser(maggie);
    const response = await medimapService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    medimapService.clearAuth();
    try {
      await medimapService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }


    
  });
});