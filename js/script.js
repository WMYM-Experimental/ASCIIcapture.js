//variables and constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const DENSITY_SP = "         .:░▒▓█";
const DENSITY = "█▓Ñ@#W$98765543210?!abc;:+=-,._";

let pic = new Image(); //user
pic.src = "img/me.jpeg";

canvas.width = 500;
canvas.height = 500;

pic.width = canvas.width;
pic.height = canvas.height;
class ASCIIart {
  #imageCellArray = [];
  #density = [];
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
}

const draw = () => {
  const effect = new ASCIIart(ctx, pic.width, pic.height);
  console.log(effect);
  requestAnimationFrame(draw);
};

draw();
