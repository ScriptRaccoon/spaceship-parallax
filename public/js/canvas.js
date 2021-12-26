export const canvas = {
    ship: document.getElementById("shipCanvas"),
    star1: document.getElementById("starCanvas1"),
    star2: document.getElementById("starCanvas2"),
    star3: document.getElementById("starCanvas3"),
};

export const ctx = {
    ship: canvas.ship.getContext("2d"),
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
    ctx.ship.font = "30px Consolas";
    ctx.ship.fillStyle = "white";
    ctx.ship.textAlign = "center";
    ctx.ship.fillText(
        "Use the Arrow keys to move the spaceship.",
        canvas.ship.width / 2,
        canvas.ship.height / 2 - 100
    );
    ctx.ship.fillText(
        "Use the Space key to shoot lazers.",
        canvas.ship.width / 2,
        canvas.ship.height / 2 - 50
    );
    ctx.ship.fillText(
        "Press Enter to start the game.",
        canvas.ship.width / 2,
        canvas.ship.height / 2 + 100
    );
}
