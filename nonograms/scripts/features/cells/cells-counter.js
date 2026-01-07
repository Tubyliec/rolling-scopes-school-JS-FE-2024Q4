export function cellsCounter(array, numsArray) {
  for (let i = 0; i < array.length; i += 1) {
    let sum = [];
    let counter = 0;
    for (let j = 0; j < array[i].length; j += 1) {
      if (array[i][j] === 1) {
        counter += 1;
        if (array[i][j + 1] !== 1) {
          sum.push(counter);
          counter = 0;
        }
      }
    }
    numsArray.push(sum);
  }
}
