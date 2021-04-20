export function flipMatrix<T extends any[][]>(matrix: T): T {
  return matrix.reduce((newMatrix, row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      newMatrix[columnIndex] = newMatrix[columnIndex] || [];
      newMatrix[columnIndex][rowIndex] = cell;
    });
    return newMatrix;
  }, []) as T;
}
