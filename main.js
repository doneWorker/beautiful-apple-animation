const canvas = document.getElementById("canvas");
const hero = document.querySelector(".hero");
const ctx = canvas.getContext("2d");
const frameIdx = 0;
const link =
  "https://www.apple.com/105/media/us/macbook-pro-14-and-16/2021/a1c5d17e-d8e4-4fa8-b70a-bc61bd266412/anim/hero-specs//large/large_00{{i}}.jpg";

const pxToVh = (px) =>
  parseInt(px * (100 / document.documentElement.clientWidth), 10);

const asyncImageLoader = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("could not load image"));
  });
};

const loadImages = () => {
  let min = 0;
  let max = 86;
  const promises = [];

  for (let i = min; i < max; i++) {
    promises.push(
      asyncImageLoader(link.replace("{{i}}", i.toString().padStart(2, "0")))
    );
  }

  return Promise.all(promises);
};

drawImage = (img) => {
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
};

window.onload = async () => {
  const images = await loadImages();
  drawImage(images[0]);
  document.addEventListener("scroll", function () {
    let idx = pxToVh(window.scrollY - hero.offsetTop);
    drawImage(images[idx]);
  });
};
