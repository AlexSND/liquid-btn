export default class Mouse {
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  x = 0;
  y = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.rect = this.canvas.getBoundingClientRect();
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  onMouseMove(e: MouseEvent) {
    this.x = e.offsetX;
    this.y = e.offsetY;
  }
}