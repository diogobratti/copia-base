const config = require("./config.json");
const Axios = require("./Axios");
const public_path = "/public";
const get = async (url) => {
  // try {
  return await Axios.get(public_path + url);
  // } catch (error) {
  //   console.log(error);
  // }
};
const post = async (url, params) => {
  // try {
  return await Axios.post(public_path + url, params);
  // } catch (error) {
  //   console.log(error);
  // }
};
const postMethodTests = [
//   {
//     //   name: "",
//     url: "",
//     params: {},
//     result: {},
//   },
//   {
//     url: "/user/signUp",
//     params: {},
//   },
  {
    url: "/error/notify",
    params: {
        error: "Test",
        localStorage: null,
        url: "test url",
        UserId: 1,
    },
    responseStatus: 201,
  },
];
const getMethodTests = [
  //   {
  //     //   name: "",
  //     url: "",
  //     params: {},
  //     result: {},
  //   },
  {
    url: "/state/listWithCities",
  },
  {
    url: "/category/listWithProvider",
  },
  {
    url: "/category/listWithProvider/1",
  },
  {
    url: "/category/listWithProvider/2",
  },
  {
    url: "/provider/listStarred",
  },
  {
    url: "/provider/listWhereCategory/1",
  },
  {
    url: "/provider/listWhereCategory/2",
  },
  {
    url: "/provider/listByParam/categoryId/1/numberOfRows/30/lastItemId/0",
  },
  {
    url: "/product/listByParam/providerId/1/numberOfRows/30/lastItemId/0",
  },
  {
    url: "/product/listByProvider/1",
  },
  {
    url: "/product/listByProvider/2",
  },
  {
    url: "/productGroup/listWithProductByProvider/1",
  },
  {
    url: "/productGroup/listWithProductByProvider/2",
  },
];
getMethodTests.forEach((element) => {
  test("Testing GET : " + public_path + element.url, async () => {
    const response = await get(element.url);
    // console.log(response);
    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();
    expect(response.data).not.toBeNull();
    expect(response.data).not.toBeUndefined();
    expect(response.data.length).toBeGreaterThan(0);
  });
});

postMethodTests.forEach((element) => {
    test("Testing POST : " + public_path + element.url, async () => {
      const response = await post(element.url, element.params);
      console.log(response);
      expect(response).not.toBeNull();
      expect(response).not.toBeUndefined();
      expect(response.status).not.toBeNull();
      expect(response.status).not.toBeUndefined();
      expect(response.status).toBe(element.responseStatus);
    });
  });
