export type canvasKey = "entity" | "star1" | "star2" | "star3";

export const canvas = {
	entity: document.getElementById("entityCanvas"),
	star1: document.getElementById("starCanvas1"),
	star2: document.getElementById("starCanvas2"),
	star3: document.getElementById("starCanvas3"),
} as Record<canvasKey, HTMLCanvasElement>;

export const ctx = {
	entity: canvas.entity.getContext("2d"),
	star1: canvas.star1.getContext("2d"),
	star2: canvas.star2.getContext("2d"),
	star3: canvas.star3.getContext("2d"),
} as Record<canvasKey, CanvasRenderingContext2D>;

function makeCanvasFullScreen(
	canvasEl: HTMLCanvasElement,
	factor: number = 1
) {
	canvasEl.width = factor * window.innerWidth;
	canvasEl.height = factor * window.innerHeight;
}

export function makeCanvasesFullScreen() {
	makeCanvasFullScreen(canvas.entity);
	makeCanvasFullScreen(canvas.star1, 2);
	makeCanvasFullScreen(canvas.star2, 2);
	makeCanvasFullScreen(canvas.star3, 2);
}

export function clearCanvas(key: canvasKey) {
	ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}
