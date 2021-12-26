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
let gameRunning = false;

preloadImages(() => {
    stars = new Stars();
    ship = new SpaceShip();
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
    lazers.forEach((lazer) => lazer.update());
    ship.update();
    lazers.forEach((lazer) => lazer.draw());
    ship.draw();
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
