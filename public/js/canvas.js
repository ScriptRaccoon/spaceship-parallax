export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function makeCanvasFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
