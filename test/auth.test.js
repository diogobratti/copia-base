const config = require("./config.json");
const database = require("../models");
const tokens = require("../auth/tokens");
const {
  Axios,
  login,
  authenticatedGet,
  authenticatedPostRefreshToken,
  authenticatedPostAccessToken,
} = require("./Axios");
const i18n = require("../i18n/texts");
const allowlistRefreshToken = require("../redis/allowlistRefreshToken");
test("login ", async () => {
  jest.setTimeout(30000);
  const response = await login(config.USERNAME_TEST, config.PASSWORD_TEST);
  expect(response).not.toBeNull();
  expect(response).not.toBeUndefined();
  expect(response.data).not.toBeNull();
  expect(response.data).not.toBeUndefined();
  expect(response.data.accessToken).not.toBeNull();
  expect(response.data.accessToken).not.toBeUndefined();
  expect(response.data.refreshToken).not.toBeNull();
  expect(response.data.refreshToken).not.toBeUndefined();
  expect(response.data.user).not.toBeNull();
  expect(response.data.user).not.toBeUndefined();
});

test("logout ", async () => {
  jest.setTimeout(30000);
  const response = await authenticatedGet(
    "auth/logout",
    config.USERNAME_TEST,
    config.PASSWORD_TEST
  );
  expect(response).not.toBeNull();
  expect(response).not.toBeUndefined();
  expect(response.status).not.toBeNull();
  expect(response.status).not.toBeUndefined();
  expect(response.status).toBe(204);
});

test("forgotMyPassword ", async () => {
  jest.setTimeout(30000);
  const body = {
    email: config.EMAIL_TEST,
  };
  const forgotMyPassword = await authenticatedPostRefreshToken(
    "auth/forgotMyPassword",
    body,
    config.USERNAME_TEST,
    config.PASSWORD_TEST
  );
  expect(forgotMyPassword).not.toBeNull();
  expect(forgotMyPassword).not.toBeUndefined();
  expect(forgotMyPassword.data).not.toBeNull();
  expect(forgotMyPassword.data).not.toBeUndefined();
  expect(forgotMyPassword.data.message).not.toBeUndefined();
  expect(forgotMyPassword.data.message).not.toBeNull();
  expect(forgotMyPassword.data.message).toBe(i18n.EMAIL_FORGOT_PASSWORD_SENT);
});
test("passwordChange ", async () => {
  jest.setTimeout(30000);
  const user = await database.User.findOne({
    where: { email: config.EMAIL_TEST },
  });
  const token = await tokens.passwordChange.create(user);
  expect(token).not.toBeNull();
  expect(token).not.toBeUndefined();
  const body = {
    password: config.NEW_PASSWORD_TEST,
    token: token,
  };
  const passwordChange = await authenticatedPostRefreshToken(
    "auth/passwordChange",
    body,
    config.USERNAME_TEST,
    config.PASSWORD_TEST
  );
  expect(passwordChange).not.toBeNull();
  expect(passwordChange).not.toBeUndefined();
  expect(passwordChange.data).not.toBeNull();
  expect(passwordChange.data).not.toBeUndefined();
  expect(passwordChange.data.message).not.toBeUndefined();
  expect(passwordChange.data.message).not.toBeNull();
  expect(passwordChange.data.message).toBe(i18n.PASSWORD_CHANGED);
});
