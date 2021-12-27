import { canvas, clearCanvas, ctx } from "./canvas.js";

export function drawIntroScreen() {
    clearCanvas("message");
    ctx.message.fillStyle = "white";
    ctx.message.font = "30px Consolas";
    ctx.message.textAlign = "center";
    ctx.message.fillText(
        "Game is loading...",
        canvas.message.width / 2,
        canvas.message.height / 2
    );
}

export function drawLoadingScreen() {
    clearCanvas("message");
    ctx.message.textAlign = "center";
    ctx.message.fillStyle = "yellow";
    ctx.message.font = "100px Consolas";
    ctx.message.fillText(
        "SPACE PARALLAX",
        canvas.message.width / 2,
        canvas.message.height / 2 - 100
    );
    ctx.message.font = "30px Consolas";
    ctx.message.fillStyle = "white";
    ctx.message.fillText(
        "Use the Arrow keys to move the spaceship.",
        canvas.message.width / 2,
        canvas.message.height / 2
    );

    ctx.message.fillText(
        "Use the Space key to shoot lazers.",
        canvas.message.width / 2,
        canvas.message.height / 2 + 50
    );
    ctx.message.fillText(
        "Watch out for asteroids!",
        canvas.message.width / 2,
        canvas.message.height / 2 + 100
    );
    ctx.message.fillText(
        "Press Enter to start/pause the game.",
        canvas.message.width / 2,
        canvas.message.height / 2 + 200
    );
}

export function drawPause() {
    clearCanvas("message");
    ctx.message.fillStyle = "white";
    ctx.message.font = "30px Consolas";
    ctx.message.textAlign = "center";
    ctx.message.fillText(
        "Paused",
        canvas.message.width / 2,
        canvas.message.height / 2
    );
}

export function drawGameover(score) {
    clearCanvas("message");
    ctx.message.fillStyle = "red";
    ctx.message.textAlign = "center";
    ctx.message.font = "90px Consolas";
    ctx.message.fillText(
        "Gameover",
        canvas.message.width / 2,
        canvas.message.height / 2 - 100
    );
    ctx.message.fillStyle = "white";
    ctx.message.font = "50px Consolas";
    ctx.message.fillText(
        `Score: ${score}`,
        canvas.message.width / 2,
        canvas.message.height / 2
    );
    ctx.message.font = "30px Consolas";
    ctx.message.fillText(
        "Press Enter to restart the game.",
        canvas.message.width / 2,
        canvas.message.height / 2 + 100
    );
}
