class PiDecimalGenerator {
  constructor() {
    this.q = 1n;
    this.r = 180n;
    this.t = 60n;
    this.i = 2n;
    this.decimalsStr = "";
  }

  get(index) {
    while (index >= this.decimalsStr.length) {
      this.calculate();
    }

    return parseInt(this.decimalsStr[index]);
  }

  calculate() {
    let y = (this.q * (27n * this.i - 12n) + 5n * this.r) / (5n * this.t);
    let u = 3n * (3n * this.i + 1n) * (3n * this.i + 2n);

    this.r = 10n * u * (this.q * (5n * this.i - 2n) + this.r - y * this.t);
    this.q = 10n * this.q * this.i * (2n * this.i - 1n);
    this.t = this.t * u;
    this.i = this.i + 1n;

    this.decimalsStr += y;
  }
}

let pi = new PiDecimalGenerator();
