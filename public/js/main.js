import { Asteroid } from "./entities/Asteroid.js";
import { Lazer } from "./entities/Lazer.js";
import { SpaceShip } from "./entities/SpaceShip.js";
import { clearCanvas, makeCanvasesFullScreen } from "./canvas.js";
import { debounce } from "./helper.js";
import { preloadImages } from "./images.js";
import { Stars } from "./Stars.js";

makeCanvasesFullScreen();

preloadImages(() => {
    const stars = new Stars();
    const ship = new SpaceShip();

    stars.generate();
    stars.draw();

    gameLoop();

    Asteroid.startGenerating();

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
        requestAnimationFrame(gameLoop);
    }
});
