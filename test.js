function createFunction(array) {
  let i = 0;
  function inner() {
    const element = array[i];
    i++;
    return element;
  }
  return inner;
}

const returnNextElement = createFunction([4, 5, 6]);
returnNextElement();
const element1 = returnNextElement();
const element2 = returnNextElement();
//console.log(element1, element2);

const arr = [1, 2, 3, 4, 5];

function sumFunc(arr) {
  let i = arr.length - 1,
    sum = 0;
  function inner() {
    while (i >= 0) {
      let element = arr[i];
      sum += element;
      i--;
    }
    return sum;
  }
  return inner;
}

const itr = sumFunc(arr);

console.log(itr());
