import { SpaceShip } from "./entities/SpaceShip.js";
import { clearCanvas, makeCanvasFullScreen } from "./canvas.js";

makeCanvasFullScreen();

const ship = new SpaceShip();

function gameLoop() {
    clearCanvas();
    ship.update();
    ship.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
