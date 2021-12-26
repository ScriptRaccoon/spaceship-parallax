import { Asteroid } from "./Asteroid.js";
import {
    clearCanvas,
    canvas,
    makeFullScreen,
    drawLoadingScreen,
} from "./canvas.js";
import { debounce } from "./helper.js";
import { preloadImages } from "./images.js";
import { lazers } from "./Lazer.js";
import { SpaceShip } from "./SpaceShip.js";
import { Stars } from "./Stars.js";

makeFullScreen(canvas.ship);
makeFullScreen(canvas.star1, 2);
makeFullScreen(canvas.star2, 2);
makeFullScreen(canvas.star3, 2);

let stars;
let ship;
let asteroid;
let gameRunning = false;

preloadImages(() => {
    stars = new Stars();
    ship = new SpaceShip();
    asteroid = new Asteroid({ pos: { x: 600, y: 600 } });
    stars.generate();
    stars.draw();
    drawLoadingScreen();

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !gameRunning) {
            gameRunning = true;
            loop();
        }
    });
});

function loop() {
    clearCanvas("ship");
    [...lazers, ship, asteroid].forEach((obj) => obj.update());
    [...lazers, ship, asteroid].forEach((obj) => obj.draw());
    stars.update(ship);
    requestAnimationFrame(loop);
}

window.addEventListener(
    "resize",
    debounce(() => {
        makeFullScreen(canvas.ship);
        makeFullScreen(canvas.star1, 2);
        makeFullScreen(canvas.star2, 2);
        makeFullScreen(canvas.star3, 2);
        stars.generate();
        stars.draw();
        if (!gameRunning) drawLoadingScreen();
    }, 150)
);
