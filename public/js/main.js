import { asteroids, Asteroid } from "./entities/Asteroid.js";
import { clearCanvas, canvas, makeFullScreen } from "./canvas.js";

import { debounce } from "./helper.js";
import { preloadImages } from "./images.js";
import { lazers } from "./entities/Lazer.js";
import { SpaceShip } from "./entities/SpaceShip.js";
import { Stars } from "./Stars.js";
import {
    drawGameover,
    drawIntroScreen,
    drawLoadingScreen,
    drawPause,
    drawScore,
} from "./screens.js";

makeFullScreen(canvas.entity);
makeFullScreen(canvas.star1, 2);
makeFullScreen(canvas.star2, 2);
makeFullScreen(canvas.star3, 2);

let stars;
let ship;
let gameRunning = false;
let gameOver = false;

drawIntroScreen();

preloadImages(() => {
    stars = new Stars();
    ship = new SpaceShip();
    stars.generate();
    stars.draw();
    drawLoadingScreen();

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "Enter":
                if (gameOver) {
                    gameOver = false;
                    ship.reset();
                } else if (gameRunning) {
                    gameRunning = false;
                    Asteroid.stopGenerating();
                } else {
                    gameRunning = true;
                    Asteroid.startGenerating();
                    loop();
                }
                break;
        }
    });
});

function loop() {
    clearCanvas("entity");
    [...lazers, ...asteroids, ship].forEach((obj) =>
        obj.update(ship)
    );
    [...lazers, ...asteroids, ship].forEach((obj) => obj.draw());
    stars.update(ship);
    if (ship.destroyed) {
        gameOver = true;
        drawGameover(ship.score);
    }
    drawScore(ship.score);
    if (gameRunning) {
        requestAnimationFrame(loop);
    } else {
        drawPause();
    }
}

window.addEventListener(
    "resize",
    debounce(() => {
        makeFullScreen(canvas.entity);
        makeFullScreen(canvas.star1, 2);
        makeFullScreen(canvas.star2, 2);
        makeFullScreen(canvas.star3, 2);
        stars.generate();
        stars.draw();
        if (!gameRunning) drawLoadingScreen();
    }, 150)
);
