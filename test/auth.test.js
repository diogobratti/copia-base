const config = require("./config.json");
const {Axios} = require("./Axios");
const login = async (username, password) => {
  // try {
  return await Axios.post("auth/login", {
    username: username,
    password: password,
  });
  // } catch (error) {
  //   console.log(error);
  // }
};
test("login ", async () => {
  // const response = await login("dbratti", "123456789");
  //     console.log(response);
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
