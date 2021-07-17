// async/await was Introduced in ES8
const { log } = require("console");
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

const getDogPic = async () => {
  try {
    const data = await readFilePromise(__dirname + "/dog.txt");
    console.log("Breed : " + data);

    const res = await superagent.get(
      `https://source.unsplash.com/featured/?${data}`
    );

    await writeFilePromise("dog-bak.jpg", res.body);
    console.log("File written");
  } catch (err) {
    console.log(err);
    //throwing error
    throw err;
  }

  return "2. Async function is done!";
};

// IFI (Immediate Function Invocation)
(async () => {
  try {
    console.log("1.Getting dog pics!");
    console.log("3.Got dog pics!");
    const x = await getDogPic();
    console.log(x);
  } catch (error) {
    console.log(error);
  }
})();
