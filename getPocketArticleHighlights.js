require('dotenv').config();

// const fs = require("fs");
// const path = require("path");

const httpClient = require("./src/axios");

const { ACCESS_TOKEN, CONSUMER_KEY } = process.env;

if (!ACCESS_TOKEN || !CONSUMER_KEY) {
  console.error("❌ Missing auth data!");
  process.exit();
}

(async () => {

  let codeResponse;
  try {
    codeResponse = await httpClient.post("get", {
      consumer_key: CONSUMER_KEY,
      access_token: ACCESS_TOKEN,
      images: 1,
      videos: 1,
      tags: 1,
      rediscovery: 1,
      annotations: 1,
      authors: 1,
      itemOptics: 1,
      meta: 1,
      posts: 1,
      total: 1,
      forceaccount: 1,
      state: 'all',
      sort: 'newest',
      detailType: 'complete',
      count: 1,
    });
  } catch (error) {
    console.log(error.message);
  }
  
  console.log(codeResponse.data);
})()