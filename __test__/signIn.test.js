const { responseOk } = require("../helpers/responses");
const { signInCtrl } = require("../controllers/authCtrl");

jest.mock("../controllers/authCtrl", () => ({
  signInCtrl: jest.fn(),
}));

describe("signInCtrl", () => {
  let req, res, next, returnResponse;

  const user = {
    email: "test2@gmail.com",
    subscription: "business",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA0YWYyOGFjNjZmMzkxNGZhZmNiNTQiLCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTY3ODkxMjk2OSwiZXhwIjoxNjc4OTE2NTY5fQ.ifRjW749Y4C79aWksIvGym9VS3W-h9NAUsjqqwYcTNU",
  };

  beforeEach(() => {
    req = {
      body: { email: "user@example.com", password: "password" },
    };
    res = { json: jest.fn() };
    next = jest.fn();

    returnResponse = responseOk(
      "Success",
      200,
      "User signed in successfully",
      user
    );

    signInCtrl.mockResolvedValue(returnResponse);
  });

  it("should return a status code of 200 and a token", async () => {
    const response = await signInCtrl(req, res, next);

    expect(response.code).toEqual(200);
  });

  it("The response should return a token.", async () => {
    const response = await signInCtrl(req, res, next);

    expect(response.ResponseBody.data.token).toEqual(user.token);
  });

  it("The response should return a user object with 2 fields email and subscription, having the data type String.", async () => {
    const response = await signInCtrl(req, res, next);

    expect(response.ResponseBody.data).toEqual(user);
    expect(typeof response.ResponseBody.data.email).toEqual("string");
    expect(typeof response.ResponseBody.data.subscription).toEqual("string");
  });
});
