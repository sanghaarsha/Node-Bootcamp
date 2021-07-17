const fs = require("fs");
const superagent = require("superagent");

// APIS you can use :
// https://source.unsplash.com/featured/?${KEYWORD}
// https://dog.ceo/api/breed/${breedName}/images/random

fs.readFile(__dirname + "/dog.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Breed : " + data.toString());
    // http get
    superagent
      .get(`https://source.unsplash.com/featured/?${data}`)
      .end((err, res) => {
        if (err) return console.log(err);
        fs.writeFile("dog-img.jpg", res.body, (error) => {
          if (error) return console.log(error);
        });
        console.log();
      });
  }
});
