import { Matrix, addMatrices, multiply, randomMatrix, transpose } from "./matrix.js";


export class Layer{

    private weights: Matrix | undefined;
    private biases: Matrix | undefined;

    private size: number;
    private activationFunction: (m: Matrix) => Matrix;
    
    constructor(size: number, activation: (m: Matrix) => Matrix){
        this.size = size;
        this.activationFunction = activation;

    }

    public initWeights(inputSize: number): number {

        this.weights = randomMatrix(inputSize, this.size);
        this.biases = randomMatrix(1, this.size);

        return this.size;

    }

    public feedForward(inputVector: Matrix): Matrix{
        if (!this.weights || !this.biases) {
            throw new Error("Weights and biases not initialized!");
        }

        const multResult = multiply(this.weights, inputVector);
        const weightedSum = addMatrices(multResult, this.biases);
        return this.activationFunction(weightedSum);


    }
}



export class ArtificialNeuralNetwork {
    private learningRate: number;
    private layers: Layer[];

    // techincally incorrect, it is multilayer perception, but artificial neural network sounds fancier
    constructor(inputLength: number, learningRate: number, layers: Layer[]){
        this.learningRate = learningRate;
        this.layers = layers;

        for(const layer of layers) {
            inputLength = layer.initWeights(inputLength);
        }
    }
   

    public predOne(input: number[]): number[] {
       let feedForwardVector = transpose(new Matrix([input]));
       for(const layer of this.layers) {
        feedForwardVector = layer.feedForward(feedForwardVector);
       }

       return transpose(feedForwardVector).getValues()[0];

    }



}   