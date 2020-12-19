const AccessControl = require("accesscontrol");
const control = new AccessControl();

control
  .grant("client")
  .readAny("product")
  .readAny("provider")
  .readAny("category")
  .readOwn("order")
  .createOwn("order")
  .updateOwn("order")
  .readOwn("cart")
  .createOwn("cart")
  .updateOwn("cart")
  .deleteOwn("cart")
  .readOwn("user")
  .readOwn("address")
  .createOwn("address")
  .updateOwn("address")
  .deleteOwn("address");

control
  .grant("seller")
  .extend("client")
  .createOwn("product")
  .updateOwn("product")
  .deleteOwn("product");

control.grant("admin").extend("seller");

module.exports = control;
