const config = require('./config.json');
// const Axios = require('./Axios');
// const login = async (username, password) => {
//     try {
//       return await Axios.post("auth/login", {
//         username: username,
//         password: password,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  function sum(a, b) {
      return a + b;
    }
test('adds 1 + 2 to equal 3' + config.BASE_URL, async () => {
//     const response = await login('dbratti','123456789');
//     console.log(response);
    expect(sum(1, 2)).toBe(3);
  });