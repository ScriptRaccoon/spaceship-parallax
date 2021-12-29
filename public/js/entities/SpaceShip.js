import { canvas, ctx } from "../canvas.js";

export class SpaceShip {
    constructor() {
        this.image = new Image();
        this.image.src = "./img/ship.png";
        this.size = { x: 100, y: 100 };

        this.pos = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        this.vel = { x: 0.6, y: 0 };
        this.force = { x: 0, y: 0 };
        this.maximalForce = 0.8;
        this.friction = 0.99;

        this.rotation = 0;
        this.rotationVel = 0;
        this.rotationForce = 0;
        this.rotationMaximalForce = 0.03;
        this.rotationFriction = 0.95;

        this.status = "idle";
        this.frames = {
            idle: 0,
            boost_forwards: 1,
            boost_backwards: 2,
            turn_right: 3,
            turn_left: 4,
        };

        this.addControls();
    }

    update() {
        this.vel.x += this.force.x;
        this.vel.y += this.force.y;
        this.force.x = 0;
        this.force.y = 0;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;

        this.rotationVel += this.rotationForce;
        this.rotationForce = 0;
        this.rotation += this.rotationVel;
        this.rotationVel *= this.rotationFriction;

        this.handleTinyVel();
        this.boundToCanvas();
    }

    handleTinyVel(threshold = 0.01) {
        if (Math.abs(this.vel.x) < threshold) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < threshold) {
            this.vel.y = 0;
        }

        if (Math.abs(this.rotationVel) < threshold) {
            this.rotationVel = 0;
        }
    }

    boundToCanvas() {
        this.pos.x = Math.max(0, Math.min(canvas.width, this.pos.x));
        this.pos.y = Math.max(0, Math.min(canvas.height, this.pos.y));
    }

    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
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

        ctx.restore();
    }

    addControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.boost({ direction: "forwards" });
                    break;
                case "ArrowDown":
                    this.boost({ direction: "backwards" });
                    break;
                case "ArrowLeft":
                    this.turn({ direction: "left" });
                    break;
                case "ArrowRight":
                    this.turn({ direction: "right" });
                    break;
            }
        });
        window.addEventListener("keyup", (e) => {
            const keys = [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
            ];
            if (keys.includes(e.key)) {
                this.status = "idle";
            }
        });
    }

    turn({ direction }) {
        if (this.destroyed) return;
        this.status = `turn_${direction}`;
        const sign = direction == "right" ? +1 : -1;
        this.rotationForce = sign * this.rotationMaximalForce;
    }

    boost({ direction }) {
        if (this.destroyed) return;
        this.status = `boost_${direction}`;
        const sign = direction == "forwards" ? +1 : -1;
        this.force = {
            x: sign * this.maximalForce * Math.cos(this.rotation),
            y: sign * this.maximalForce * Math.sin(this.rotation),
        };
    }
}
