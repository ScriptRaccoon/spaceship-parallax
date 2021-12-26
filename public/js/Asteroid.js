import { canvas, ctx } from "./canvas.js";
import { randInt } from "./helper.js";
import { IMAGE } from "./images.js";

export let asteroids = [];

export function generateAsteroids(frequency = 800) {
    setInterval(() => new Asteroid(), frequency);
}

export class Asteroid {
    constructor() {
        this.size = { x: 128, y: 128 };
        const side = randInt(0, 4);
        switch (side) {
            case 0:
                this.pos = {
                    x: -this.size.x,
                    y: randInt(0, canvas.star1.height),
                };
                this.vel = { x: 3, y: randInt(-4, 5) };
                break;
            case 1:
                this.pos = {
                    x: canvas.star1.width,
                    y: randInt(0, canvas.star1.height),
                };
                this.vel = { x: -3, y: randInt(-4, 5) };
                break;
            case 2:
                this.pos = {
                    x: randInt(0, canvas.star1.width),
                    y: -this.size.y,
                };
                this.vel = { x: randInt(-4, 5), y: 3 };
                break;
            case 3:
                this.pos = {
                    x: randInt(0, canvas.star1.width),
                    y: canvas.star1.height,
                };
                this.vel = { x: randInt(-4, 5), y: -3 };
                break;
        }
        this.offset = { x: 0, y: 0 };
        this.animationTimer = 0;
        this.parallax = 1;

        asteroids.push(this);
    }

    update(ship) {
        this.animationTimer++;
        if (this.animationTimer >= 120) this.animationTimer = 0;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.offset = {
            x: -this.parallax * ship.pos.x,
            y: -this.parallax * ship.pos.y,
        };
        this.removeIfOutside();
    }

    draw() {
        const frame =
            "Asteroid-A-09-" +
            this.animationTimer.toString().padStart(3, "0");
        const image = IMAGE[frame];
        ctx.ship.drawImage(
            image,
            this.pos.x + this.offset.x,
            this.pos.y + this.offset.y
        );
    }
    removeIfOutside() {
        const isInside =
            this.pos.x + this.size.x >= 0 &&
            this.pos.x <= canvas.star1.width + this.size.x &&
            this.pos.y + this.size.y >= 0 &&
            this.pos.y <= canvas.star1.height;
        if (!isInside) {
            asteroids = asteroids.filter((a) => a != this);
        }
    }
}
