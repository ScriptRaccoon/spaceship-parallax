type screenName = "loading" | "start" | "pause" | "gameover";

const screens = {
	loading: document.getElementById("loadingScreen"),
	start: document.getElementById("startScreen"),
	pause: document.getElementById("pauseScreen"),
	gameover: document.getElementById("gameoverScreen"),
} as Record<screenName, HTMLElement>;

export function hideScreen() {
	for (const screen of Object.values(screens)) {
		screen.classList.remove("visible");
	}
}

export function showScreen(name: screenName) {
	hideScreen();
	screens[name].classList.add("visible");
}
