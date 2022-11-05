import { Asteroid } from "./entities/Asteroid";
import { Lazer } from "./entities/Lazer";
import { SpaceShip } from "./entities/SpaceShip";
import { clearCanvas, makeCanvasesFullScreen } from "./canvas";
import { debounce } from "./helper";
import { preloadImages } from "./images";
import { Stars } from "./Stars";
import { hideScreen, showScreen } from "./screens";

makeCanvasesFullScreen();
showScreen("loading");

preloadImages(() => {
	showScreen("start");

	const stars = new Stars();
	const ship = new SpaceShip();

	let gameRunning = false;

	stars.generate();
	stars.draw();

	window.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			if (ship.destroyed) {
				hideScreen();
				Asteroid.removeAll();
				ship.reset();
			} else if (gameRunning) {
				showScreen("pause");
				gameRunning = false;
				Asteroid.stopGenerating();
			} else if (!gameRunning) {
				hideScreen();
				gameRunning = true;
				Asteroid.startGenerating();
				ship.showScore();
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
		if (gameRunning) requestAnimationFrame(gameLoop);
	}
});
