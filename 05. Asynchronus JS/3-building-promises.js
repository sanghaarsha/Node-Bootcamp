const fs = require("fs");
const superagent = require("superagent");

// creating promises
const readFilePromise = (file) => {
  //                  executer function
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Couldn't find the file!"); // can be accessed via catch handler
      resolve(data.toString()); // can be accessed via then handler
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Couldn't write to the file!");
      resolve("success");
    });
  });
};

// using created promises
readFilePromise(__dirname + "/dog.txt")
  .then((data) => {
    console.log("Breed : " + data.toString());
    superagent
      .get(`https://source.unsplash.com/featured/?${data}`)
      .then((res) => {
        writeFilePromise("dog-bak.jpg", res.body)
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  })
  .catch((err) => console.log(err));
