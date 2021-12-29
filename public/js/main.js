import { SpaceShip } from "./entities/SpaceShip.js";
import { clearCanvas, makeCanvasesFullScreen } from "./canvas.js";
import { debounce } from "./helper.js";
import { Stars } from "./Stars.js";

makeCanvasesFullScreen();

const stars = new Stars();
const ship = new SpaceShip();

ship.image.onload = () => {
    stars.generate();
    stars.draw();

    gameLoop();

    window.addEventListener(
        "resize",
        debounce(() => {
            makeCanvasesFullScreen();
            stars.generate();
            stars.draw();
        }, 150)
    );

    function gameLoop() {
        clearCanvas("entity");
        ship.update();
        stars.update(ship);
        ship.draw();
        requestAnimationFrame(gameLoop);
    }
};
