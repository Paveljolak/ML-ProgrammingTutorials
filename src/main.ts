import { Point, generatePoints } from "./data.js";
import { initGfx, setDrawable } from "./gfx.js";
import { Perception } from "./perception.js";

async function main(){
   


    initGfx();
    const points = generatePoints(100);
    setDrawable(points);


    const model = new Perception(2);
    //console.log(model.predictOne([points[0].x, points[0].y]));  // Dirty testing, but testing xD


    for(const point of points){

        const inputVector = [point.x, point.y];
        model.fitOne(inputVector, point.label);
        predictAll(model, points);
        await sleep(100);
    }

   
}


function predictAll(model: Perception, data: Point[]): void {
    // in goes through indexes, of goes through elements
    for(const point of data){ 
        const inputVector = [point.x, point.y];
        const pred = model.predictOne(inputVector);
        point.guessed = (pred == point.label);
    }
}


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
        
}

window.onload = main;