export const IMAGE = {};

const asteroidSources = new Array(120)
    .fill()
    .map((x, n) => "Asteroid-A-09-" + n.toString().padStart(3, "0"));

const sources = ["ship", ...asteroidSources];

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
