function sumFunc(arr) {
    let acc = 0;
    for (let i = 0; i < arr.length; i++) {
        acc += arr[i];
    }
    return acc;
}

console.log(sumFunc([1, 2, 3]));

function returnIterator(arr) {
    let idx = 0;
    return function () {
        const element = arr[idx];
        idx++;
        return element;
    }
}

const myIterator = returnIterator([1, 2, 3]);
console.log(myIterator());
console.log(myIterator());
console.log(myIterator());


function nextIterator(arr) {
    let idx = 0;
    const iterator = {
        next: function () {
            const element = arr[idx];
            idx++;
            return element;
        }
    }
    return iterator;
}
const iteratorWithNext = nextIterator([1,2,3]);
console.log(iteratorWithNext.next())
console.log(iteratorWithNext.next())
console.log(iteratorWithNext.next())


function  sumArray(arr){
    let acc=0;
    const iterator = nextIterator(arr);
    let next =iterator.next();
    while(next){
        acc+=next;
        next=iterator.next();
    }
    return acc;
}
console.log("sumArray",sumArray([1,2,3]));

