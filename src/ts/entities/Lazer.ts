import { Asteroid } from "./Asteroid.js";
import { canvas, ctx } from "../canvas.js";
import { coordinate, distance } from "../helper.js";
import { type SpaceShip } from "./SpaceShip.js";

export class Lazer {
	static list: Lazer[] = [];

	pos: coordinate;
	rotation: number;
	speed: number;
	vel: coordinate;

	constructor({
		pos,
		initialVel,
		rotation,
	}: {
		pos: coordinate;
		initialVel: coordinate;
		rotation: number;
	}) {
		this.pos = pos;
		this.rotation = rotation;
		this.speed = 15;
		this.vel = {
			x: initialVel.x + this.speed * Math.cos(rotation),
			y: initialVel.y + this.speed * Math.sin(rotation),
		};
		Lazer.list.push(this);
	}

	draw() {
		ctx.entity.save();
		ctx.entity.fillStyle = "green";
		ctx.entity.globalAlpha = 0.8;
		ctx.entity.translate(this.pos.x, this.pos.y);
		ctx.entity.rotate(this.rotation);
		ctx.entity.fillRect(0, -2, 40, 4);
		ctx.entity.fillStyle = "white";
		ctx.entity.fillRect(0, -0.5, 40, 1);
		ctx.entity.restore();
	}

	update(ship: SpaceShip) {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.destroyAsteroids(ship);
		this.removeIfOutside();
	}

	removeIfOutside() {
		if (
			this.pos.x < 0 ||
			this.pos.x > canvas.star1.width ||
			this.pos.y < 0 ||
			this.pos.y > canvas.star1.height
		) {
			this.remove();
		}
	}

	remove() {
		Lazer.list = Lazer.list.filter((l) => l != this);
	}

	destroyAsteroids(ship: SpaceShip) {
		Asteroid.list.forEach((asteroid) => {
			if (
				distance(this.pos, asteroid.drawPos) <
				asteroid.size / 2
			) {
				asteroid.destroyed = true;
				ship.score += asteroid.score;
				ship.showScore();
				this.remove();
			}
		});
	}
}
