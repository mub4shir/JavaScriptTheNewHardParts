// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// CHALLENGE 1

function sumFunc(arr) {
    // YOUR CODE HERE
    let accumulator = 0;
    for (let i = 0; i < arr.length; i++) {
        accumulator += arr[i];
    }
    return accumulator;
}

// Uncomment the lines below to test your work
const array = [1, 2, 3, 4];
console.log('Challenge 1A', sumFunc(array)); // -> should log 10

function returnIterator(arr) {
    // YOUR CODE HERE
    let index = 0;
    return function() {
        const value = arr[index];
        index++;
        return value;
    }

}

// Uncomment the lines below to test your work
const array2 = ['a', 'b', 'c', 'd'];
const myIterator = returnIterator(array2);
console.log('Challenge 1B', myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'



// CHALLENGE 2

function nextIterator(arr) {
    // YOUR CODE HERE
    let index = 0;
    const iterator = {
        next: function () {
            const value = arr[index];
            index++;
            return value;
        }
    }
    return iterator;
}

// Uncomment the lines below to test your work
const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log('Challenge 2', iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3



// CHALLENGE 3

function sumArray(arr) {
    // YOUR CODE HERE
    // use your nextIterator function
    let accumulator = 0;
    let iterator = nextIterator(arr);
    let next = iterator.next();
    while(next) {
        accumulator += next;
        next = iterator.next();
    }
    return accumulator
}

// Uncomment the lines below to test your work
const array4 = [1, 2, 3, 4];
console.log('Challenge 3', sumArray(array4)); // -> should log 10



// CHALLENGE 4

function setIterator(set) {
    // YOUR CODE HERE
    let setIterator = set.values();
    const iterator = {
        next: function () {
            var next = setIterator.next();
            return next['value'];
        }
    }
    return iterator;
}

// Uncomment the lines below to test your work
const mySet = new Set('hey');
const iterateSet = setIterator(mySet);
console.log('Challenge 4', iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'



// CHALLENGE 5

function indexIterator(arr) {
    // YOUR CODE HERE
    let index = 0;
    const iterator = {
        next: function () {
            const value = arr[index];
            index++;
            return [index - 1, value];
        }
    }
    return iterator;
}

// Uncomment the lines below to test your work
const array5 = ['a', 'b', 'c', 'd'];
const iteratorWithIndex = indexIterator(array5);
console.log('Challenge 5', iteratorWithIndex.next()); // -> should log [0, 'a']
console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
console.log(iteratorWithIndex.next()); // -> should log [2, 'c']



// CHALLENGE 6

function Words(string) {
    this.str = string;
}

Words.prototype[Symbol.iterator] = function() {
    // YOUR CODE HERE
    let index = 0;
    const splitStr = this.str.split(/\s/);
    return {
        next: function () {
            if (index < splitStr.length) {
                const value = splitStr[index];
                index ++;
                return {value: value, done: false};
            } else {
                return { done: true };
            }
        }
    }
}

// Uncomment the lines below to test your work
const helloWorld = new Words('Hello World');
for (let word of helloWorld) { console.log('Challenge 6', word); } // -> should log 'Hello' and 'World'

// CHALLENGE 7

function valueAndPrevIndex(array){
    let index = 0;
    return {
        sentence: function() {
            index++;
            let indexName = index;
            if (index - 1 === 0) {
                indexName = "first";
            }
            return "" + array[index - 1] + " was found after index " + indexName;
        }
    }
}

const returnedSentence = valueAndPrevIndex([4,5,6])
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());