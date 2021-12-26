export const canvas = {
    entity: document.getElementById("entityCanvas"),
    star1: document.getElementById("starCanvas1"),
    star2: document.getElementById("starCanvas2"),
    star3: document.getElementById("starCanvas3"),
};

export const ctx = {
    entity: canvas.entity.getContext("2d"),
    star1: canvas.star1.getContext("2d"),
    star2: canvas.star2.getContext("2d"),
    star3: canvas.star3.getContext("2d"),
};

export function makeFullScreen(canv, factor = 1) {
    canv.width = factor * window.innerWidth;
    canv.height = factor * window.innerHeight;
}

export function clearCanvas(key) {
    ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}

export function drawLoadingScreen() {
    clearCanvas("entity");
    ctx.entity.fillStyle = "white";
    ctx.entity.font = "30px Consolas";
    ctx.entity.textAlign = "center";
    ctx.entity.fillText(
        "Use the Arrow keys to move the spaceship.",
        canvas.entity.width / 2,
        canvas.entity.height / 2 - 100
    );

    ctx.entity.fillText(
        "Use the Space key to shoot lazers.",
        canvas.entity.width / 2,
        canvas.entity.height / 2 - 50
    );
    ctx.entity.fillText(
        "Watch out for asteroids!",
        canvas.entity.width / 2,
        canvas.entity.height / 2
    );
    ctx.entity.fillText(
        "Press Enter to start/pause the game.",
        canvas.entity.width / 2,
        canvas.entity.height / 2 + 100
    );
}

export function drawGameover(score) {
    ctx.entity.fillStyle = "white";
    ctx.entity.textAlign = "center";
    ctx.entity.font = "90px Consolas";
    ctx.entity.fillText(
        "Gameover",
        canvas.entity.width / 2,
        canvas.entity.height / 2 - 100
    );
    ctx.entity.font = "50px Consolas";
    ctx.entity.fillText(
        `Score: ${score}`,
        canvas.entity.width / 2,
        canvas.entity.height / 2
    );
    ctx.entity.font = "30px Consolas";
    ctx.entity.fillText(
        "Press Enter to restart the game.",
        canvas.entity.width / 2,
        canvas.entity.height / 2 + 100
    );
}

export function drawScore(score) {
    ctx.entity.textAlign = "left";
    ctx.entity.font = "20px Consolas";
    ctx.entity.fillStyle = "green";
    ctx.entity.globalAlpha = 0.9;
    ctx.entity.fillText(`Score: ${score}`, 15, 25);
}

export function drawIntroScreen() {
    ctx.entity.fillStyle = "white";
    ctx.entity.font = "30px Consolas";
    ctx.entity.textAlign = "center";
    ctx.entity.fillText(
        "Game is loading...",
        canvas.entity.width / 2,
        canvas.entity.height / 2
    );
}
