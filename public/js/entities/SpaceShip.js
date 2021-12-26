import { canvas, ctx } from "../canvas.js";
import { IMAGE } from "../images.js";
import { Lazer } from "./Lazer.js";

export class SpaceShip {
    constructor() {
        this.image = IMAGE.ship;
        this.size = { x: 100, y: 100 };
        this.status = "idle";
        this.pos = {
            x: canvas.entity.width / 2,
            y: canvas.entity.height / 2,
        };
        this.posVel = { x: 0.6, y: 0 };
        this.posForce = { x: 0, y: 0 };
        this.maximalposForce = 0.8;
        this.posFriction = 0.99;
        this.rotation = 0;
        this.rotationVel = 0;
        this.rotationForce = 0;
        this.maximalRotationForce = 0.03;
        this.rotationFriction = 0.95;
        this.frames = {
            idle: 0,
            boost: 1,
            anti_boost: 2,
            turn_right: 3,
            turn_left: 4,
        };
        this.destroyed = false;
        this.score = 0;
        this.alpha = 1;
        this.addControls();
    }

    addControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.boost(1);
                    break;
                case "ArrowDown":
                    this.boost(-1);
                    break;
                case "ArrowLeft":
                    this.turnLeft();
                    break;
                case "ArrowRight":
                    this.turnRight();
                    break;
                case " ":
                    this.shoot();
                    break;
            }
        });
        window.addEventListener("keyup", (e) => {
            if (
                [
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                ].includes(e.key)
            ) {
                this.status = "idle";
            }
        });
    }

    update() {
        this.posVel.x += this.posForce.x;
        this.posVel.y += this.posForce.y;
        this.posForce.x = 0;
        this.posForce.y = 0;
        this.pos.x += this.posVel.x;
        this.pos.y += this.posVel.y;
        this.posVel.x *= this.posFriction;
        this.posVel.y *= this.posFriction;

        this.rotationVel += this.rotationForce;
        this.rotationForce = 0;
        this.rotation += this.rotationVel;
        this.rotationVel *= this.rotationFriction;

        if (this.destroyed) {
            this.alpha *= 0.95;
            if (this.alpha <= 0.01) this.alpha = 0;
        }

        this.handleTinyVel();
        this.boundToCanvas();
    }

    shoot() {
        if (this.destroyed) return;
        new Lazer({
            pos: { ...this.pos },
            initialVel: { ...this.posVel },
            rotation: this.rotation,
        });
    }

    boundToCanvas() {
        this.pos.x = Math.max(
            0,
            Math.min(canvas.entity.width, this.pos.x)
        );
        this.pos.y = Math.max(
            0,
            Math.min(canvas.entity.height, this.pos.y)
        );
    }

    handleTinyVel(threshold = 0.01) {
        if (Math.abs(this.posVel.x) < threshold) {
            this.posVel.x = 0;
        }
        if (Math.abs(this.posVel.y) < threshold) {
            this.posVel.y = 0;
        }

        if (Math.abs(this.rotationVel) < threshold) {
            this.rotationVel = 0;
        }
    }

    draw() {
        ctx.entity.save();
        ctx.entity.globalAlpha = this.alpha;
        ctx.entity.translate(this.pos.x, this.pos.y);
        ctx.entity.rotate(this.rotation);
        ctx.entity.drawImage(
            this.image,
            this.frames[this.status] * this.size.x,
            0,
            this.size.x,
            this.size.y,
            -this.size.x / 2,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );

        ctx.entity.restore();
    }
    turnLeft() {
        if (this.destroyed) return;
        this.status = "turn_left";
        this.rotationForce = -this.maximalRotationForce;
    }
    turnRight() {
        if (this.destroyed) return;
        this.status = "turn_right";
        this.rotationForce = +this.maximalRotationForce;
    }
    boost(direction) {
        if (this.destroyed) return;
        this.status = direction == 1 ? "boost" : "anti_boost";
        this.posForce = {
            x:
                this.maximalposForce *
                direction *
                Math.cos(this.rotation),
            y:
                this.maximalposForce *
                direction *
                Math.sin(this.rotation),
        };
    }

    reset() {
        this.score = 0;
        this.destroyed = false;
        this.status = "idle";
        this.rotation = 0;
        this.rotationVel = 0;
        this.posVel = { x: 0, y: 0 };
        this.alpha = 1;
    }
}
