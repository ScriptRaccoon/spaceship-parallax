export type canvasKey = "entity" | "star1" | "star2" | "star3";

export const canvas = {
	entity: document.getElementById(
		"entityCanvas"
	) as HTMLCanvasElement,
	star1: document.getElementById(
		"starCanvas1"
	) as HTMLCanvasElement,
	star2: document.getElementById(
		"starCanvas2"
	) as HTMLCanvasElement,
	star3: document.getElementById(
		"starCanvas3"
	) as HTMLCanvasElement,
};

export const ctx = {
	entity: canvas.entity.getContext(
		"2d"
	) as CanvasRenderingContext2D,
	star1: canvas.star1.getContext("2d") as CanvasRenderingContext2D,
	star2: canvas.star2.getContext("2d") as CanvasRenderingContext2D,
	star3: canvas.star3.getContext("2d") as CanvasRenderingContext2D,
};

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
