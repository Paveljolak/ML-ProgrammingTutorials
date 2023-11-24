const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FRAME_TIME = 50; // ms 
let drawables = [];
export class Drawable {
    draw(ctx, cw, ch) { }
}
export function setDrawable(dw) {
    drawables = dw;
}
export function initGfx() {
    const canvas = getCanvas();
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    setInterval(draw, FRAME_TIME);
}
function draw() {
    clearScreen();
    const context = getContext();
    for (const dr of drawables) {
        dr.draw(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function clearScreen() {
    const ctx = getContext();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function getCanvas() {
    const canvas = document.getElementsByTagName("canvas")[0];
    if (!canvas) {
        throw new Error("Can't find canvas.");
    }
    return canvas;
}
function getContext() {
    const context = getCanvas().getContext("2d"); // extract some magic object and tell it, make a circle, make a rectangle etc.
    if (!context) {
        throw new Error("Can't get from canvas.");
    }
    return context;
}
