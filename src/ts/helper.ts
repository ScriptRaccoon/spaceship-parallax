export interface coordinate {
	x: number;
	y: number;
}

export function debounce(fn: () => void, delay: number) {
	let id: number;
	return () => {
		if (id) clearTimeout(id);
		id = window.setTimeout(() => {
			fn();
		}, delay);
	};
}

export function randInt(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random());
}

export function randEl<T>(list: T[]) {
	return list[randInt(0, list.length)];
}

export function distance(u: coordinate, v: coordinate) {
	return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2);
}
