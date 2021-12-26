import { asteroids } from "./Asteroid.js";
import { canvas, ctx } from "./canvas.js";
import { distance } from "./helper.js";

export let lazers = [];

export class Lazer {
    constructor({ pos, initialVel, rotation }) {
        this.pos = pos;
        this.rotation = rotation;
        this.speed = 15;
        this.vel = {
            x: initialVel.x + this.speed * Math.cos(rotation),
            y: initialVel.y + this.speed * Math.sin(rotation),
        };
        this.size = { x: 40, y: 3 };
        this.visible = true;
        lazers.push(this);
    }

    draw() {
        ctx.entity.save();
        ctx.entity.fillStyle = "green";
        ctx.entity.globalAlpha = 0.8;
        ctx.entity.translate(this.pos.x, this.pos.y);
        ctx.entity.rotate(this.rotation);
        ctx.entity.fillRect(
            0,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );
        ctx.entity.restore();
    }

    update(ship) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.destroyAsteroids(ship);
        this.removeIfOutside();
    }

    removeIfOutside() {
        const isInside =
            this.pos.x >= 0 &&
            this.pos.x <= canvas.star1.width &&
            this.pos.y >= 0 &&
            this.pos.y <= canvas.star1.clientHeight;
        if (!isInside) {
            this.remove();
        }
    }

    remove() {
        lazers = lazers.filter((l) => l != this);
    }

    destroyAsteroids(ship) {
        for (const asteroid of asteroids) {
            if (
                distance(this.pos, {
                    x: asteroid.drawPos.x,
                    y: asteroid.drawPos.y,
                }) <
                asteroid.size / 2
            ) {
                asteroid.destroyed = true;
                ship.score += asteroid.score;
                this.remove();
            }
        }
    }
}
