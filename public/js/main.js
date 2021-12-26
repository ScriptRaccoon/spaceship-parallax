import { Asteroid } from "./entities/Asteroid.js";
import { Lazer } from "./entities/Lazer.js";
import { SpaceShip } from "./entities/SpaceShip.js";
import { clearCanvas, makeCanvasesFullScreen } from "./canvas.js";
import { debounce } from "./helper.js";
import { preloadImages } from "./images.js";
import { Stars } from "./Stars.js";
import {
    drawGameover,
    drawIntroScreen,
    drawLoadingScreen,
    drawPause,
    drawScore,
} from "./screens.js";

makeCanvasesFullScreen();
drawIntroScreen();

preloadImages(() => {
    drawLoadingScreen();

    const stars = new Stars();
    const ship = new SpaceShip();

    let gameRunning = false;
    let gameOver = false;

    stars.generate();
    stars.draw();

    window.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            if (gameOver) {
                gameOver = false;
                Asteroid.removeAll();
                ship.reset();
            } else if (gameRunning) {
                gameRunning = false;
                Asteroid.stopGenerating();
            } else {
                gameRunning = true;
                Asteroid.startGenerating();
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
            if (!gameRunning) drawLoadingScreen();
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
        drawScore(ship.score);
        if (ship.destroyed) {
            gameOver = true;
            drawGameover(ship.score);
        }
        gameRunning ? requestAnimationFrame(gameLoop) : drawPause();
    }
});
