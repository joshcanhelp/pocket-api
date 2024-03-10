const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://getpocket.com/v3/",
  headers: {
    "Content-Type": "application/json; charset=UTF8",
    "X-Accept": "application/json",
  }
});