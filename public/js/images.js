export const IMAGE = {};

const Asteroid_08_Sources = new Array(60)
    .fill()
    .map((x, n) => "Asteroid-A-08-" + n.toString().padStart(2, "0"));

const Asteroid_09_Sources = new Array(120)
    .fill()
    .map((x, n) => "Asteroid-A-09-" + n.toString().padStart(3, "0"));

const Asteroid_10_Sources = new Array(60)
    .fill()
    .map((x, n) => "Asteroid-A-10-" + n.toString().padStart(2, "0"));

const sources = [
    "ship",
    ...Asteroid_08_Sources,
    ...Asteroid_09_Sources,
    ...Asteroid_10_Sources,
];

export function preloadImages(callbackFunction) {
    function preloadImage(i) {
        if (i < sources.length) {
            const img = new Image();
            img.onload = () => {
                preloadImage(i + 1);
            };
            IMAGE[sources[i]] = img;
            img.src = `./img/${sources[i]}.png`;
        } else {
            callbackFunction();
        }
    }
    preloadImage(0);
}
