import { writable } from "svelte/store";
export const day = writable({
    'name': '',
    'number': 0,
    'handleOneStar': () => {},
    'handleTwoStar': () => {},
    'initialize': () => {},
    'running': 0
})