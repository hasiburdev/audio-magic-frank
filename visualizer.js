const main = () => {
  const canvas = document.getElementById("audio-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Bar {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.color = color;
    }
    show = (context) => {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    };
    update = (micInput) => {
      //   this.x++;
      this.height = micInput;
    };
  }
  const bars = [];
  const mic = new Microphone();

  const createBars = () => {
    const barWidth = canvas.width / 256;
    for (let i = 0; i < 256; i++) {
      let color = `hsl(${i * 2}, 100%, 50%)`;
      bars.push(
        new Bar(
          barWidth * i,
          canvas.height / 2,
          1,
          100,
          color
        )
      );
    }
  };
  createBars();

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mic.initialized) {
      const samples = mic.getSamples();
      bars.forEach((bar, i) => {
        bar.show(ctx);
        bar.update(samples[i] * canvas.height * .5);
      });
    }

    requestAnimationFrame(animate);
  };
  animate();
};

window.addEventListener("DOMContentLoaded", main);
