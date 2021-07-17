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

    // multiple promises
    const res1pro = superagent.get(
      `https://source.unsplash.com/featured/?${data}`
    );

    const res2pro = superagent.get(
      `https://source.unsplash.com/featured/?${data}`
    );

    const res3pro = superagent.get(
      `https://source.unsplash.com/featured/?${data}`
    );

    // awaiting multiple promises at once
    const all = await Promise.all([res1pro, res2pro, res3pro]);
    // array mapping
    const imgs = all.map((el) => el.body);

    // writing to file
    await writeFilePromise("dog-bak-1.jpg", imgs[0]);
    await writeFilePromise("dog-bak-2.jpg", imgs[1]);
    await writeFilePromise("dog-bak-3.jpg", imgs[2]);

    console.log("File written");
  } catch (err) {
    console.log(err);
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
