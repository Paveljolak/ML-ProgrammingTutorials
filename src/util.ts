import {Matrix, mapByElt, multiplyByElement, oneMatrix, subtractMatrices} from "./matrix.js";


// Sigmout is a function that maps something between 0 and 1. If its - it goes bellow 0.5, if its + it goes above 0.5
// Formula taken from Wikipedia.
export class ActivationFunction {
    static sigmoid = (m: Matrix): Matrix => {
        return mapByElt(m, el => 1 / (1 + Math.exp(-el)));

    }
}

// We are going to need the derivative of the activation function
// Since we need the derivative so the model can learn.
export class DerivativeFunction{
    static sigmoid = (m: Matrix): Matrix => {
        // sig (x) * ( 1- sig(x))
        const sig = ActivationFunction.sigmoid(m);
        const one = oneMatrix(m.getCols(), m.getCols());
        const oneMinusSig = subtractMatrices(one, sig);
        return multiplyByElement(sig, oneMinusSig);
    }
}


export function getDerivative(func: (m: Matrix) => Matrix): (m: Matrix) => Matrix {
    if (func == ActivationFunction.sigmoid) return DerivativeFunction.sigmoid;

    throw new Error("Can't find the derivative function");
}