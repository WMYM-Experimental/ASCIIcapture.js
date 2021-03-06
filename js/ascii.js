const btn = document.getElementById("btn");
const imgInput = document.getElementById("img-input");

let newSrc;

btn.addEventListener("click", async function () {
  newSrc = imgInput.value.trim();
  pic.src = await newSrc;
});

//variables and DOM manipulations stuff
const rangeInput = document.getElementById("resolution");
const rangeInputLabel = document.getElementById("resolution-label");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let art;
let pic = new Image(); //user
pic.src = "img/foo.png";
let resolution = 10;

class Cell {
  constructor(x, y, char, color) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillText(this.char, this.x, this.y);
  }
}

class ASCIIart {
  #imageCellArray = [];
  #pixels = [];
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(pic, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  #setChar(m) {
    // const ORI_DENSITY = "█▓Ñ@#W$98765543210?!abc;:+=-,._";
    // const DENSITY = "@#W0$wmy?!;:+=-,._";
    if (m > 252) return "@";
    else if (m > 238) return "#";
    else if (m > 224) return "W";
    else if (m > 210) return "0";
    else if (m > 196) return "$";
    else if (m > 182) return "w";
    else if (m > 168) return "m";
    else if (m > 154) return "y";
    else if (m > 140) return "?";
    else if (m > 126) return "!";
    else if (m > 112) return ";";
    else if (m > 98) return ":";
    else if (m > 84) return "+";
    else if (m > 70) return "=";
    else if (m > 56) return "-";
    else if (m > 42) return ",";
    else if (m > 28) return ".";
    else if (m > 14) return "_";
    else return "";
  }

  #scan(cellSize) {
    this.#imageCellArray = [];
    for (let j = 0; j < this.#pixels.height; j = j + cellSize) {
      for (let i = 0; i < this.#pixels.width; i = i + cellSize) {
        let x_cor = i * 4;
        let y_cor = j * 4;
        let location = y_cor * this.#pixels.width + x_cor;

        if (this.#pixels.data[location + 3] > 100) {
          let r = this.#pixels.data[location];
          let g = this.#pixels.data[location + 1];
          let b = this.#pixels.data[location + 2];

          let sumC = r + g + b;
          let media = sumC / 3;
          const color = `rgb(${r},${g},${b})`;
          const char = this.#setChar(media);

          if (sumC > 100) {
            this.#imageCellArray.push(new Cell(i, j, char, color));
          }
        }
      }
    }
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#imageCellArray.forEach((c) => {
      c.draw();
    });
  }

  setup(cellSize) {
    this.#scan(cellSize);
    this.#draw();
  }
}

rangeInput.addEventListener("change", () => {
  rangeInputLabel.innerHTML = `RESOLUTION ${rangeInput.value}(px); <a href="https://onlinepngtools.com/convert-png-to-base64">Use Base64 Img URL input data</a>`;
  resolution = parseInt(rangeInput.value);
  ctx.font = `${resolution}px 'Red Hat Mono', monospace`; //resolution + "px monospace"
  art.setup(resolution);
});

pic.onload = function init() {
  canvas.width = 500;
  canvas.height = 500;

  pic.width = canvas.width = 500;
  pic.height = canvas.height = 500;

  art = new ASCIIart(ctx, pic.width, pic.height);
  art.setup(resolution);
};
