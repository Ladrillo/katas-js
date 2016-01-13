import { codewars } from './challenges/codewars';

codewars();

class Square {
    constructor(side) {
        this._side = side * 1000;
    }
    get side() {
        return `the side of this square is ${this._side} mm`;
    }
    set side(newSide) {
        this._side = newSide * 1000;
    }
}

let mySquare = new Square(4);

console.log(mySquare.side);

mySquare.side = 3;

Object.defineProperty(mySquare, "cosa", {value:'tonta', writable:false});


console.log(mySquare);
// console.log(mySquare.cosa);

Object.freeze(mySquare);
mySquare.side = 5;
console.log(mySquare);
// mySquare.cosa = 'not happening';