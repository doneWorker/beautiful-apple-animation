const client = require("https");
const fs = require("fs");

const dir = "./images";
const link =
  "https://www.apple.com/105/media/us/macbook-pro-14-and-16/2021/a1c5d17e-d8e4-4fa8-b70a-bc61bd266412/anim/hero-specs//large/large_00{{i}}.jpg";

const createFolder = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const fetchAllImages = () => {
  const start = 0;
  const end = 86;

  for (let i = start; i < end; i++) {
    let num = i.toString().padStart(2, "0");
    downloadImage(link.replace("{{i}}", num), `./images/large_00${num}.jpg`);
  }
};

function downloadImage(url, filepath) {
  client.get(url, (res) => {
    res.pipe(fs.createWriteStream(filepath));
  });
}

const run = () => {
  createFolder();
  fetchAllImages();
};

run();
