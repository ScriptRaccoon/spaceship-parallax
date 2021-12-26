import { canvas, ctx } from "./canvas.js";
import { randInt } from "./helper.js";
import { IMAGE } from "./images.js";

export let asteroids = [];

export function generateAsteroids(frequency = 800) {
    setInterval(() => new Asteroid(), frequency);
}

export class Asteroid {
    constructor() {
        this.size = 128;
        const side = randInt(0, 4);
        switch (side) {
            case 0:
                this.pos = {
                    x: -this.size / 2,
                    y: randInt(0, canvas.star1.height),
                };
                this.vel = { x: randInt(1, 4), y: randInt(-4, 5) };
                break;
            case 1:
                this.pos = {
                    x: canvas.star1.width,
                    y: randInt(0, canvas.star1.height),
                };
                this.vel = { x: -randInt(1, 4), y: randInt(-4, 5) };
                break;
            case 2:
                this.pos = {
                    x: randInt(0, canvas.star1.width),
                    y: -this.size / 2,
                };
                this.vel = { x: randInt(-4, 5), y: randInt(1, 4) };
                break;
            case 3:
                this.pos = {
                    x: randInt(0, canvas.star1.width),
                    y: canvas.star1.height,
                };
                this.vel = { x: randInt(-4, 5), y: -randInt(1, 4) };
                break;
        }
        this.offset = { x: 0, y: 0 };
        this.animationTimer = 0;
        this.parallax = 1;
        this.drawPos = { x: 0, y: 0 };
        asteroids.push(this);
        this.destroyed = false;
    }

    update(ship) {
        this.animationTimer++;
        if (this.animationTimer >= 120) this.animationTimer = 0;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.drawPos = {
            x: this.pos.x - this.parallax * ship.pos.x,
            y: this.pos.y - this.parallax * ship.pos.y,
        };
        if (this.destroyed) {
            this.vel = { x: 0, y: 0 };
            this.size *= 0.8;
            if (this.size <= 1) {
                this.remove();
            }
        }

        this.removeIfOutside();
    }

    draw() {
        ctx.ship.save();
        ctx.ship.translate(this.drawPos.x, this.drawPos.y);
        const frame =
            "Asteroid-A-09-" +
            this.animationTimer.toString().padStart(3, "0");
        const image = IMAGE[frame];
        ctx.ship.drawImage(
            image,
            0,
            0,
            128,
            128,
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.ship.restore();
    }
    removeIfOutside() {
        const isInside =
            this.pos.x + this.size / 2 >= 0 &&
            this.pos.x <= canvas.star1.width + this.size / 2 &&
            this.pos.y + this.size / 2 >= 0 &&
            this.pos.y <= canvas.star1.height + this.size / 2;
        if (!isInside) {
            this.remove();
        }
    }

    remove() {
        asteroids = asteroids.filter((a) => a != this);
    }
}
