import { ctx } from "./canvas.js";

ctx.ship.fillStyle = "green";

export class Lazer {
    constructor({ pos, vel, rotation }) {
        this.pos = pos;
        this.vel = vel;
        this.rotation = rotation;
        this.size = { x: 2, y: 40 };
    }

    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.size.x / 2, 0, this.size.x, this.size.y);
        ctx.restore();
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}
