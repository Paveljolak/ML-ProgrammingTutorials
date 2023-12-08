import { Matrix, addMatrices, multiply, randomMatrix, transpose } from "./matrix.js";
export class Layer {
    constructor(size, activation) {
        this.size = size;
        this.activationFunction = activation;
    }
    initWeights(inputSize) {
        this.weights = randomMatrix(inputSize, this.size);
        this.biases = randomMatrix(1, this.size);
        return this.size;
    }
    feedForward(inputVector) {
        if (!this.weights || !this.biases) {
            throw new Error("Weights and biases not initialized!");
        }
        const multResult = multiply(this.weights, inputVector);
        const weightedSum = addMatrices(multResult, this.biases);
        return this.activationFunction(weightedSum);
    }
}
export class ArtificialNeuralNetwork {
    // techincally incorrect, it is multilayer perception, but artificial neural network sounds fancier
    constructor(inputLength, learningRate, layers) {
        this.learningRate = learningRate;
        this.layers = layers;
        for (const layer of layers) {
            inputLength = layer.initWeights(inputLength);
        }
    }
    predOne(input) {
        let feedForwardVector = transpose(new Matrix([input]));
        for (const layer of this.layers) {
            feedForwardVector = layer.feedForward(feedForwardVector);
        }
        return transpose(feedForwardVector).getValues()[0];
    }
}
