/**
 * 将数组两个位置的元素交换
 */
function swap (arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export {
  swap
}
