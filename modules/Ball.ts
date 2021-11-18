export default class Ball {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx = 0;
  vy = 0;
  radius: number;
  color: string;
  friction = 0.7;
  springFactor = 0.2;

  constructor(x: number, y: number, radius?: number, color?: string) {
    this.x = x || 0;
    this.y = y || 0;
    this.originalX = x || 0;
    this.originalY = y || 0;
    this.radius = radius || 2;
    this.color = color || '#ff0000';
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  think(cursorX: number, cursorY: number, cursorRadius: number) {
    let dx = this.x - cursorX;
    let dy = this.y - cursorY;
    let dist = Math.sqrt((dx * dx) + (dy * dy))

    // interaction
    if (dist < cursorRadius) {
      const angle = Math.atan2(dy, dx);
      const tx = cursorX + Math.cos(angle) * cursorRadius;
      const ty = cursorY + Math.sin(angle) * cursorRadius;
      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }

    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;

    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }

  spring() {

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}