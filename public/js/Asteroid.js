import { ctx } from "./canvas.js";
import { randInt } from "./helper.js";
import { IMAGE } from "./images.js";

export class Asteroid {
    constructor({ pos }) {
        this.pos = pos;
        this.vel = { x: 0, y: 0 };
        this.animationTimer = 0;
    }

    update() {
        this.animationTimer++;
        if (this.animationTimer >= 120) this.animationTimer = 0;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw() {
        const imageName =
            "Asteroid-A-09-" +
            Math.floor(this.animationTimer)
                .toString()
                .padStart(3, "0");
        ctx.ship.drawImage(IMAGE[imageName], this.pos.x, this.pos.y);
    }
}
