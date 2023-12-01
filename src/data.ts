import { Drawable } from "./gfx";




export class Point implements Drawable {
    x: number;
    y: number;
    label: number; // the class of the point.
    guessed: boolean; // has our model figured out the thing

    constructor(x: number, y: number, label: number) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.guessed = false;
    }
    draw(ctx: CanvasRenderingContext2D, cw: number, ch: number): void {
        const drawX = cw * this.x;
        const drawY = ch * this.y;
        ctx.fillStyle = "black";
        // making a circle
        ctx.beginPath(); // start drawing.
        ctx.arc(drawX, drawY, 10, 0, 2 * Math.PI); // this function is to make a circle - DOES NOT DRAW IT, IT ONLY PLANS IT.
        if(this.label == 1) {
            ctx.fill();
        }else{
            ctx.stroke();
        }

        ctx.beginPath();
        if(this.guessed == true){
            ctx.fillStyle = "green";
        }else{
            ctx.fillStyle = "red";
        }
        ctx.arc(drawX, drawY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export function generatePoints(count: number): Point[]{
    const out: Point[] = [];
    for(let i = 0; i < count; i++){
        const x = Math.random();
        const y = Math.random();
        let label = 1;
        if(x > y) {
            label = -1;
        }
        out.push(new Point(x, y, label));
    }

    return out;

}