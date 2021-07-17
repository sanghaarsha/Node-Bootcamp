const fs = require("fs");
const superagent = require("superagent");

// creating promises
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Couldn't find the file!");
      resolve(data.toString());
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Couldn't write to the file!");
      resolve("file written successfully!");
    });
  });
};

// using created promises, and chaining them
readFilePromise(__dirname + "/dog.txt")
  .then((data) => {
    // it returns promise
    return superagent.get(`https://source.unsplash.com/featured/?${data}`);
  })
  // chaining the returned promise
  .then((res) => {
    return writeFilePromise("dog-bak.jpg", res.body);
  })
  // chaining the returned promise again
  .then((res) => console.log(res))
  //   one error handler to rule them all !
  .catch((err) => console.log(err));
