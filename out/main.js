var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { generatePoints } from "./data.js";
import { initGfx, setDrawable } from "./gfx.js";
import { ActivationFunction } from "./util.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        initGfx();
        const points = generatePoints(100);
        setDrawable(points);
        const model = new ArtificialNeuralNetwork(2, 0.03, [
            new Layer(10, ActivationFunction.sigmoid),
            new Layer(100, ActivationFunction.sigmoid),
            new Layer(1, ActivationFunction.sigmoid),
        ]);
        const input = [points[0].x, points[0].y];
        console.log(model.predOne(input));
        // for(const point of points){
        //     const inputVector = [point.x, point.y];
        //     model.fitOne(inputVector, point.label);
        //     predictAll(model, points);
        //     await sleep(100);
        // }
    });
}
// function predictAll(model: Perception, data: Point[]): void {
//     // in goes through indexes, of goes through elements
//     for(const point of data){ 
//         const inputVector = [point.x, point.y];
//         const pred = model.predictOne(inputVector);
//         point.guessed = (pred == point.label);
//     }
// }
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
window.onload = main;
