export function rotateMatrix(matrix) {
  const newMatrix = structuredClone(matrix);
  const matrixLength = matrix.length;

  let newArray = [];
  for (let i = 0; i < matrixLength; i += 1) {
    let temp = [];
    for (let j = 0; j < matrixLength; j += 1) {
      temp = [...temp, matrix[j][i]];
    }
    newArray = [...newArray, [...temp]];
  }
  for (let i = 0; i < newArray.length; i += 1) {
    for (let j = 0; j < newArray[0].length; j += 1) {
      newMatrix[i][j] = newArray[i][j];
    }
  }
  return newMatrix;
}