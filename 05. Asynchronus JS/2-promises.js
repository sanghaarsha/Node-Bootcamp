const fs = require("fs");
const superagent = require("superagent");

fs.readFile(__dirname + "/dog.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Breed : " + data.toString());
    superagent
      .get(`https://source.unsplash.com/featured/?${data}`) // promise pending
      .then((res) => {
        //promise resolved
        fs.writeFile("dog-bak.jpg", res.body, (error) => {
          if (error) return console.log(error);
        });
      }) // error resolving promise
      .catch((error) => console.log(error));
  }
});
