import { clearCanvas, makeCanvasFullScreen } from "./canvas.js";
import { SpaceShip } from "./entities/SpaceShip.js";

makeCanvasFullScreen();

window.addEventListener("resize", () => {
    makeCanvasFullScreen();
});

const ship = new SpaceShip();

ship.image.onload = () => {
    gameLoop();
};

function gameLoop() {
    clearCanvas();
    ship.update();
    ship.draw();
    requestAnimationFrame(gameLoop);
}
