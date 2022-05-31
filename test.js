// function createFunction(array) {
//   let i = 0;
//   function inner() {
//     const element = array[i];
//     i++;
//     return element;
//   }
//   return inner;
// }
//
// const returnNextElement = createFunction([4, 5, 6]);
// returnNextElement();
// const element1 = returnNextElement();
// const element2 = returnNextElement();
// //console.log(element1, element2);
//
// const arr = [1, 2, 3, 4, 5];
//
// function sumFunc(arr) {
//   let i = arr.length - 1,
//     sum = 0;
//   function inner() {
//     while (i >= 0) {
//       let element = arr[i];
//       sum += element;
//       i--;
//     }
//     return sum;
//   }
//   return inner;
// }
//
// const itr = sumFunc(arr);

//console.log(itr());

// function* createFlow() {
//   yield 4;
//   yield 5;
//   yield 6;
//   yield undefined;
//   yield 7;
// }
// const returnNextElement = createFlow();
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// // o/p
// { value: 4, done: false }
// { value: 5, done: false }
// { value: 6, done: false }
// { value: undefined, done: false }
// { value: 7, done: false }
// { value: undefined, done: true }

// function createFlow(array) {
//   let i = 0;
//   const inner = {
//     next: function () {
//       const element = array[i];
//       i++;
//       return element;
//     },
//   };
//   return inner;
// }
//
// const returnNextElement = createFlow([4, 5, 6]);
// const element1 = returnNextElement.next();
// const element2 = returnNextElement.next();
//
// console.log(element1, element2);

// function* createFlow() {
//   yield 4;
//   yield 5;
//   yield 6;
//   yield undefined;
//   yield 7;
// }
// const returnNextElement = createFlow();
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());

function *createFlow(){
  const num=10;
  const newNum = yield num;
  yield 5 + newNum;
  yield 6
}

const returnNextElement = createFlow();
console.log(returnNextElement.next());
console.log(returnNextElement.next(2));
console.log(returnNextElement.next());

// console.log(returnNextElement.next());
// console.log(returnNextElement.next());
// console.log(returnNextElement.next());