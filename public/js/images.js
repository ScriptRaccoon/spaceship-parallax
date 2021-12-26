export const IMAGE = {};

const sources = ["ship"];

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
