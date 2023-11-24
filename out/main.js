import { generatePoints } from "./data.js";
import { initGfx, setDrawable } from "./gfx.js";
function main() {
    initGfx();
    const points = generatePoints(100);
    setDrawable(points);
}
window.onload = main;
