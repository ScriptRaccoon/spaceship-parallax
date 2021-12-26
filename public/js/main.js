import { Asteroid } from "./entities/Asteroid.js";
import { Lazer } from "./entities/Lazer.js";
import { SpaceShip } from "./entities/SpaceShip.js";
import { clearCanvas, makeCanvasesFullScreen } from "./canvas.js";
import { debounce } from "./helper.js";
import { preloadImages } from "./images.js";
import { Stars } from "./Stars.js";
import {
    drawIntroScreen,
    drawLoadingScreen,
    drawPause,
} from "./messages.js";

makeCanvasesFullScreen();
drawIntroScreen();

preloadImages(() => {
    drawLoadingScreen();

    const stars = new Stars();
    const ship = new SpaceShip();

    let gameRunning = false;

    stars.generate();
    stars.draw();

    window.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            if (ship.destroyed) {
                clearCanvas("message");
                Asteroid.removeAll();
                ship.reset();
            } else if (gameRunning) {
                gameRunning = false;
                drawPause();
                Asteroid.stopGenerating();
            } else {
                gameRunning = true;
                Asteroid.startGenerating();
                clearCanvas("message");
                gameLoop();
            }
        }
    });

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
        [...Lazer.list, ...Asteroid.list, ship, stars].forEach(
            (obj) => obj.update(ship)
        );
        [...Lazer.list, ...Asteroid.list, ship].forEach((obj) =>
            obj.draw()
        );
        gameRunning ? requestAnimationFrame(gameLoop) : drawPause();
    }
});
