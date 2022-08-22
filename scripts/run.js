const fetch = require("node-fetch");

const callSuccess = () => {
  return fetch("http://localhost:3002/success");
};

const callSlow = () => {
  return fetch("http://localhost:3002/slow");
};

const callFail = () => {
  return fetch("http://localhost:3002/fail");
};

const callError = () => {
  return fetch("http://localhost:3002/error");
};

const callFlaky = () => {
  return fetch("http://localhost:3002/flaky");
};

async function run() {
  while (true) {
    await callSlow();
    await callSuccess();
    await callError();
    await callFail();
    await callFlaky();

    console.log(`requests made`);
  }
}

run();
