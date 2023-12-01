export class Perception{


    private bias: number;
    private weights: number[];
    private learningRate: number = 0.05;
    private activationFunction: (x: number) => number;
    private loss: (pred: number, goal: number) => number;
    

    constructor(inputLength: number){
        this.weights = [];
        this.bias = Math.random() * 2 - 1; // substract 1 to offset it so we get -1 and 1
        for (let i = 0; i < inputLength; i++){
            this.weights.push(Math.random() * 2 - 1);
        }
        this.activationFunction = ActivationFunction.sign;
        this.loss = LossFunction.gradientDescent;
    }

    predictOne(input: number[]) {
        const weightedSum = this.weightedSum(input);
        return this.activationFunction(weightedSum);

    }

    public fitOne(input:number[], label: number): number {

        // predition to calculate the error
        const prediction = this.predictOne(input);

        // calculate the error 
        const error = this.loss(prediction, label);
        this.adjustWeights(input, error);
        return error;
    }

    private adjustWeights(input: number[], error: number): void{

        this.bias += (1 * error * this.learningRate);
        for(let i = 0; i < input.length; i++){
            this.weights[i] += (input[i] * error * this.learningRate);
        }

    }

    private weightedSum(input: number[]): number{
        let sum = (1 * this.bias); // We don't really need the one but it is there so it is all clear.
        for(let i = 0; i < input.length; i++){

            sum += (input[i] * this.weights[i]);
        }
        return sum;
    }



}


export class ActivationFunction {

    static sign = (sum: number): number => {
        if (sum >= 0) {
            return 1;
        }else{
            return -1;
        }

    }

}


export class LossFunction {
    static gradientDescent = (pred: number, goal: number): number => {

        return goal - pred; // Goal - prediction.  Basically we are calculating the loss.

    }

}