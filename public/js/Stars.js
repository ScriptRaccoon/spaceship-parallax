import { randInt } from "./helper.js";
import { canvas, clearCanvas, ctx } from "./canvas.js";

export class Stars {
    constructor() {
        this.list = { 1: [], 2: [], 3: [] };
        this.sizes = Object.keys(this.list);
        this.number = { 1: 7000, 2: 1000, 3: 700 };
        this.parallax = { 1: 0.75, 2: 0.8, 3: 0.85 };
        this.alpha = { 1: 0.5, 2: 0.7, 3: 0.8 };
        this.generate();
        this.draw();
    }
    generate() {
        for (const size of this.sizes) {
            this.list[size] = [];
            for (let i = 0; i < this.number[size]; i++) {
                const x = randInt(0, canvas[`star${size}`].width);
                const y = randInt(0, canvas[`star${size}`].height);
                this.list[size].push({ x, y });
            }
        }
    }
    draw() {
        for (const size of this.sizes) {
            clearCanvas(`star${size}`);
            ctx[`star${size}`].fillStyle = "rgb(200, 179, 79)";
            ctx[`star${size}`].globalAlpha = this.alpha[size];
            for (const { x, y } of this.list[size]) {
                ctx[`star${size}`].beginPath();
                ctx[`star${size}`].arc(
                    x,
                    y,
                    size / 2,
                    0,
                    2 * Math.PI
                );
                ctx[`star${size}`].fill();
            }
        }
    }
    update(ship) {
        for (const size of this.sizes) {
            const offset = {
                x: -this.parallax[size] * ship.pos.x,
                y: -this.parallax[size] * ship.pos.y,
            };
            canvas[
                `star${size}`
            ].style.transform = `translateX(${offset.x}px) translateY(${offset.y}px)`;
        }
    }
}
