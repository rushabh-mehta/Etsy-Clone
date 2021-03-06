const axios = require("axios");
const assert = require("assert");


const apiUrl = "http://localhost:3001/api";

let userJWT = "";
let userId = "";
let shopId = "";
describe("POST - login api", () => {
  it("/login/", (done) => {
    axios
      .post(apiUrl + "/login/", { email: "rushabh.mehta@sjsu.edu", password: "Admin@123" })
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        assert.equal(response.data.success,true);
        assert.equal(response.data.user.name,"Rushabh Mehta");
        assert.equal(response.data.user.id,'d9c333a6-859f-429e-b112-ab20c16dd2b8');
        userJWT = response.data.user.token;
        userId = response.data.user.id;
        shopId = response.data.user.shop;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET - user categories api", () => {
  it("/category/", (done) => {
    axios
      .get(apiUrl + `/category/${userId}`,{headers:{
        Authorization: `Bearer ${userJWT}`
    }})
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        assert.equal(response.data.success,true);
        assert.equal(response.data.categories.length,6);
        
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST - user shop api", () => {
  it("/shop/", (done) => {
    axios
      .post(apiUrl + `/shop/home`,{userId:userId,shopId:9},{headers:{
        Authorization: `Bearer ${userJWT}`
    }})
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        assert.equal(response.data.success,true);
        assert.equal(response.data.shopFound,true);
        assert.equal(response.data.editRights,true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST - home page items api", () => {
  it("/item/", (done) => {
    axios
      .post(apiUrl + `/item/other`,{id:userId,shop:shopId},{headers:{
        Authorization: `Bearer ${userJWT}`
    }})
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        assert.equal(response.data.success,true);
        assert.notEqual(response.data.items.length,0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET - user cart item api", () => {
  it("/cart/", (done) => {
    axios
      .get(apiUrl + `/cart/get/${userId}`,{headers:{
        Authorization: `Bearer ${userJWT}`
    }})
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        assert.equal(response.data.success,true);
        assert.notEqual(response.data.items.length,0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});