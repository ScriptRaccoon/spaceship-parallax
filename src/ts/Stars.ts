import { randInt, type coordinate } from "./helper.js";
import { canvas, clearCanvas, ctx } from "./canvas.js";
import { type SpaceShip } from "./entities/SpaceShip.js";

type sizes = "1" | "2" | "3";

export class Stars {
	sizes: sizes[];
	list: Record<sizes, coordinate[]>;
	number: Record<sizes, number>;
	parallax: Record<sizes, number>;
	alpha: Record<sizes, number>;
	color: string;
	scale: number;
	scaleVel: number;
	constructor() {
		this.sizes = ["1", "2", "3"];
		this.list = { 1: [], 2: [], 3: [] };
		this.number = { 1: 7000, 2: 1000, 3: 700 };
		this.parallax = { 1: 0.75, 2: 0.8, 3: 0.85 };
		this.alpha = { 1: 0.5, 2: 0.7, 3: 0.8 };
		this.color = "rgb(200, 179, 79)";
		this.scale = 1;
		this.scaleVel = 0.00025;
		this.updateCanvas({
			x: canvas.entity.width / 2,
			y: canvas.entity.height / 2,
		});
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
			ctx[`star${size}`].fillStyle = this.color;
			ctx[`star${size}`].globalAlpha = this.alpha[size];
			this.list[size].forEach(({ x, y }) => {
				ctx[`star${size}`].beginPath();
				ctx[`star${size}`].arc(
					x,
					y,
					parseInt(size) / 2,
					0,
					2 * Math.PI
				);
				ctx[`star${size}`].fill();
			});
		}
	}

	update(ship: SpaceShip) {
		this.updateCanvas(ship.pos);
		this.updateScale();
	}

	updateScale() {
		this.scale += this.scaleVel;
		if (this.scale > 1.7 || this.scale < 1) {
			this.scaleVel *= -1;
		}
	}

	updateCanvas(pos: coordinate) {
		for (const size of this.sizes) {
			const offset = {
				x: -this.parallax[size] * pos.x,
				y: -this.parallax[size] * pos.y,
			};
			canvas[`star${size}`].style.transform =
				`translateX(${offset.x}px)` +
				`translateY(${offset.y}px)` +
				`scale(${this.scale})`;
		}
	}
}
