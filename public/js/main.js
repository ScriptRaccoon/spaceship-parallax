import { clearCanvas, canvas, makeFullScreen } from "./canvas.js";
import { debounce } from "./helper.js";
import { SpaceShip } from "./SpaceShip.js";
import { Stars } from "./Stars.js";

makeFullScreen(canvas.ship);
makeFullScreen(canvas.star1, 2);
makeFullScreen(canvas.star2, 2);
makeFullScreen(canvas.star3, 2);

const stars = new Stars();
const ship = new SpaceShip();

function loop() {
    clearCanvas("ship");
    ship.update();
    ship.draw();
    stars.update(ship);
    requestAnimationFrame(loop);
}

loop();

window.addEventListener(
    "resize",
    debounce(() => {
        makeFullScreen(canvas.ship);
        makeFullScreen(canvas.star1, 2);
        makeFullScreen(canvas.star2, 2);
        makeFullScreen(canvas.star3, 2);
        stars.generate();
        stars.draw();
    }, 150)
);
