require('dotenv').config();
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const httpClient = require("./src/axios");

const { CONSUMER_KEY } = process.env;

(async () => {

  let codeResponse;
  try {
    codeResponse = await httpClient.post("oauth/request", {
      consumer_key: CONSUMER_KEY,
      redirect_uri: "uri",
    });
  } catch (error) {
    console.log(error.message);
  }
  
  const { code } = codeResponse.data;

  rl.question(`https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=uri`, async () => {
    let tokenResponse;
    try {
      tokenResponse = await httpClient.post("oauth/authorize", {
        consumer_key: CONSUMER_KEY,
        code,
      });
    } catch (error) {
      console.log(error.message);
    }

    console.log(tokenResponse.data);
    rl.close();
  });
  
  rl.on('close', () => {
    console.log('FIN');
    process.exit(0);
  });
})()