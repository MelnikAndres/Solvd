function square(x) {
  return x * x;
}

function sum(a, b) {
  return a + b;
}

function double(a) {
  return a*2;
}

function compose(...fns) {
    return (...values) => fns.reduceRight((accum, nextFn) => (accum[Symbol.iterator]? nextFn(...accum): nextFn(accum)),values)
}

const calculateSquareOfSum = compose(square, sum);

const calculateDoubleSquareOfSum = compose(double, square, sum);

const result = calculateSquareOfSum(3, 4);
console.log("Result:", result);

const result_double = calculateDoubleSquareOfSum(3, 4);
console.log("Result double:", result_double);