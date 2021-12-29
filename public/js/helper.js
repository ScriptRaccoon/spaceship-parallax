export function debounce(fn, delay) {
    let id;
    return (...args) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}
