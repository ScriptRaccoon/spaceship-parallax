export const canvas = {
    entity: document.getElementById("entityCanvas"),
    star1: document.getElementById("starCanvas1"),
    star2: document.getElementById("starCanvas2"),
    star3: document.getElementById("starCanvas3"),
};

export const ctx = {
    entity: canvas.entity.getContext("2d"),
    star1: canvas.star1.getContext("2d"),
    star2: canvas.star2.getContext("2d"),
    star3: canvas.star3.getContext("2d"),
};

export function makeFullScreen(canv, factor = 1) {
    canv.width = factor * window.innerWidth;
    canv.height = factor * window.innerHeight;
}

export function clearCanvas(key) {
    ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}
