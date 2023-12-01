var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generatePoints } from "./data.js";
import { initGfx, setDrawable } from "./gfx.js";
import { Perception } from "./perception.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        initGfx();
        const points = generatePoints(100);
        setDrawable(points);
        const model = new Perception(2);
        //console.log(model.predictOne([points[0].x, points[0].y]));  // Dirty testing, but testing xD
        for (const point of points) {
            const inputVector = [point.x, point.y];
            model.fitOne(inputVector, point.label);
            predictAll(model, points);
            yield sleep(100);
        }
    });
}
function predictAll(model, data) {
    // in goes through indexes, of goes through elements
    for (const point of data) {
        const inputVector = [point.x, point.y];
        const pred = model.predictOne(inputVector);
        point.guessed = (pred == point.label);
    }
}
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
window.onload = main;
