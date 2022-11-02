import { canvas, ctx } from "../canvas";
import {
	distance,
	randInt,
	randEl,
	type coordinate,
} from "../helper";
import { IMAGE } from "../images";
import { showScreen } from "../screens";
import { type SpaceShip } from "./SpaceShip";

type asteroidType = "s" | "m" | "l";

type direction = "left" | "right" | "top" | "bottom";

export class Asteroid {
	static list: Asteroid[] = [];

	static SIZE: Record<asteroidType, number> = {
		s: 32,
		m: 64,
		l: 128,
	};

	static FRAME_COUNT: Record<asteroidType, number> = {
		s: 60,
		m: 60,
		l: 120,
	};

	static SCORE: Record<asteroidType, number> = {
		s: 5,
		m: 2,
		l: 1,
	};

	static interval: number | undefined;

	static removeAll() {
		Asteroid.list = [];
	}

	static startGenerating(frequency: number = 300) {
		Asteroid.interval = setInterval(
			() => new Asteroid(),
			frequency
		);
	}

	static stopGenerating() {
		clearInterval(Asteroid.interval);
	}

	type: asteroidType;
	image: HTMLImageElement;
	size: number;
	pos: coordinate;
	vel: coordinate;
	animationTimer: number;
	frameCount: number;
	parallax: number;
	score: number;
	drawPos: coordinate;
	destroyed: boolean;

	constructor() {
		this.type = randEl(["s", "m", "l"]);
		const name = "asteroid-" + this.type;
		this.image = IMAGE[name];

		this.size = Asteroid.SIZE[this.type];

		const startSide = randEl<direction>([
			"left",
			"right",
			"top",
			"bottom",
		]);

		switch (startSide) {
			case "left":
				this.pos = {
					x: -this.size / 2,
					y: randInt(0, canvas.star1.height),
				};
				this.vel = { x: randInt(1, 4), y: randInt(-4, 5) };
				break;
			case "right":
				this.pos = {
					x: canvas.star1.width + this.size / 2,
					y: randInt(0, canvas.star1.height),
				};
				this.vel = { x: -randInt(1, 4), y: randInt(-4, 5) };
				break;
			case "top":
				this.pos = {
					x: randInt(0, canvas.star1.width),
					y: -this.size / 2,
				};
				this.vel = { x: randInt(-4, 5), y: randInt(1, 4) };
				break;
			case "bottom":
				this.pos = {
					x: randInt(0, canvas.star1.width),
					y: canvas.star1.height + this.size / 2,
				};
				this.vel = { x: randInt(-4, 5), y: -randInt(1, 4) };
				break;
		}
		this.animationTimer = 0;
		this.frameCount = Asteroid.FRAME_COUNT[this.type];
		this.parallax = 1;
		this.drawPos = { x: 0, y: 0 };
		this.destroyed = false;
		this.score = Asteroid.SCORE[this.type];
		Asteroid.list.push(this);
	}

	update(ship: SpaceShip) {
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
		ctx.entity.save();
		ctx.entity.translate(this.drawPos.x, this.drawPos.y);
		ctx.entity.drawImage(
			this.image,
			this.animationTimer * Asteroid.SIZE[this.type],
			0,
			Asteroid.SIZE[this.type],
			Asteroid.SIZE[this.type],
			-this.size / 2,
			-this.size / 2,
			this.size,
			this.size
		);
		ctx.entity.restore();
	}

	removeIfOutside() {
		if (
			this.pos.x + this.size / 2 < 0 ||
			this.pos.y + this.size / 2 < 0 ||
			this.pos.x > canvas.star1.width + this.size / 2 ||
			this.pos.y > canvas.star1.height + this.size / 2
		) {
			this.remove();
		}
	}

	remove() {
		Asteroid.list = Asteroid.list.filter((a) => a != this);
	}

	destroyShip(ship: SpaceShip) {
		if (
			!ship.destroyed &&
			distance(ship.pos, this.drawPos) <
				ship.size.x / 2 + this.size / 2
		) {
			ship.destroyed = true;
			ship.rotationForce = randEl([+1, -1]) * 0.2;
			showScreen("gameover");
		}
	}
}
