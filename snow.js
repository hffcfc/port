const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let snowflakes = [];
for (let i = 0; i < 200; i++) {
  snowflakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateSnow();
}

function updateSnow() {
  for (let flake of snowflakes) {
    flake.y += Math.pow(flake.d, 2);
    flake.x += Math.sin(flake.y * 0.01);

    if (flake.y > h) {
      flake.y = 0;
      flake.x = Math.random() * w;
    }
  }
}

setInterval(drawSnow, 33);
