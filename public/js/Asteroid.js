import { canvas, ctx } from "./canvas.js";
import { distance, randInt, randEl } from "./helper.js";
import { IMAGE } from "./images.js";

export let asteroids = [];

export function generateAsteroids(frequency = 300) {
    setInterval(() => new Asteroid(), frequency);
}

export class Asteroid {
    static SIZES = {
        "Asteroid-A-08": 32,
        "Asteroid-A-09": 128,
        "Asteroid-A-10": 64,
    };
    static PAD = {
        "Asteroid-A-08": 2,
        "Asteroid-A-09": 3,
        "Asteroid-A-10": 2,
    };
    static FRAME_COUNT = {
        "Asteroid-A-08": 60,
        "Asteroid-A-09": 120,
        "Asteroid-A-10": 60,
    };
    constructor() {
        const side = randInt(0, 4);
        this.type = randEl([
            "Asteroid-A-08",
            "Asteroid-A-09",
            "Asteroid-A-10",
        ]);
        this.size = Asteroid.SIZES[this.type];
        this.frameCount = Asteroid.FRAME_COUNT[this.type];
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
        if (this.animationTimer >= this.frameCount)
            this.animationTimer = 0;
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
        this.destroyShip(ship);
        this.removeIfOutside();
    }

    draw() {
        ctx.ship.save();
        ctx.ship.translate(this.drawPos.x, this.drawPos.y);
        const frame =
            this.type +
            "-" +
            this.animationTimer
                .toString()
                .padStart(Asteroid.PAD[this.type], "0");
        const image = IMAGE[frame];
        ctx.ship.drawImage(
            image,
            0,
            0,
            Asteroid.SIZES[this.type],
            Asteroid.SIZES[this.type],
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

    destroyShip(ship) {
        if (
            !ship.destroyed &&
            distance(ship.pos, this.drawPos) <
                ship.size.x / 2 + this.size / 2
        ) {
            ship.destroyed = true;
        }
    }
}
