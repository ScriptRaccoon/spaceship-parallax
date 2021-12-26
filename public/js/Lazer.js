import { canvas, ctx } from "./canvas.js";

export let lazers = [];

export class Lazer {
    constructor({ pos, vel, rotation }) {
        this.pos = pos;
        this.rotation = rotation;
        const speed = 10;
        this.vel = {
            x: speed * Math.cos(rotation),
            y: speed * Math.sin(rotation),
        };
        this.size = { x: 40, y: 2 };
        this.visible = true;
        lazers.push(this);
    }

    draw() {
        ctx.ship.fillStyle = "green";
        ctx.ship.save();
        ctx.ship.translate(this.pos.x, this.pos.y);
        ctx.ship.rotate(this.rotation);
        ctx.ship.fillRect(
            0,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );
        ctx.ship.restore();
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.removeIfOutside();
    }

    removeIfOutside() {
        const isInside =
            this.pos.x >= 0 &&
            this.pos.x <= canvas.star1.width &&
            this.pos.y >= 0 &&
            this.pos.y <= canvas.star1.clientHeight;
        if (!isInside) {
            lazers = lazers.filter((l) => l != this);
        }
    }
}
