/**
 * 数组的生成器
 * @param size 数组的大小
 * @param num 数组的元素的范围：[-num, num]
 */
function arrayGenerator (size: number, num: number) {
  const resArr: number[] = []
  const len: number = Math.floor(Math.random() * size)
  for (let i = 0; i <= len; i++) {
    resArr.push(Math.floor(Math.random() * num) - Math.floor(Math.random() * num))
  }
  return resArr
}

/**
 * 交换数组的元素
 * @param targetArr 目标数组
 * @param x 下标
 * @param y 下标
 */
function swap (targetArr: number[], x: number, y: number) {
  const temp = targetArr[x]
  targetArr[x] = targetArr[y]
  targetArr[y] = temp
}

/**
 * 冒泡排序
 * @param targetArr 目标数组
 */
function bubbleSort (targetArr: number[]) {
  const len = targetArr.length
  for (let i = len - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (targetArr[j] > targetArr[j + 1]) {
        swap(targetArr, j, j + 1)
      }
    }
  }
}

/**
 * 选择排序
 * @param targetArr 目标数组
 */
function chooseSort (targetArr: number[]) {
  const len = targetArr.length
  for (let i = len - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (targetArr[j] > targetArr[i]) {
        swap(targetArr, j, i)
      }
    }
  }
}

/**
 * 插入排序
 * @param targetArr 目标数组
 */
function insertSrot (targetArr: number[]) {
  const len = targetArr.length
  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (targetArr[j] > targetArr[j + 1]) {
        swap(targetArr, j, j + 1)
      }
    }
  }
}

/**
 * 合并左右已排序的部分
 * @param targetArr 目标数组
 * @param left 左下标
 * @param mid 中间下标
 * @param right 右下标
 */
function merge (targetArr: number[], left: number, mid: number, right: number) {
  const tempArr: number[] = []
  let l = left
  let r = mid + 1
  while (l <= mid && r <= right) {
    if (targetArr[l] < targetArr[r]) {
      tempArr.push(targetArr[l])
      l++
    } else {
      tempArr.push(targetArr[r])
      r++
    }
  }
  // 越界
  while (l <= mid) {
    tempArr.push(targetArr[l])
    l++
  }
  while (r <= right) {
    tempArr.push(targetArr[r])
    r++
  }
  for (let i = 0; i < tempArr.length; i++) {
    targetArr[left + i] = tempArr[i]
  }
}

/**
 * 归并排序递归调用过程
 * @param targetArr 目标数组
 * @param left 左下标
 * @param right 右下标
 */
function mergeSortProcess (targetArr: number[], left: number, right: number) {
  if (left === right) {
    return
  }
  const mid = Math.floor(left + (right - left) / 2)
  mergeSortProcess(targetArr, left, mid)
  mergeSortProcess(targetArr, mid + 1, right)
  merge(targetArr, left, mid, right)
}

/**
 * 归并排序
 * @param targetArr 目标数组
 */
function mergeSort (targetArr: number[]) {
  const len = targetArr.length
  if (len < 2) {
    return
  }
  mergeSortProcess(targetArr, 0, len - 1)
}

/**
 * 根据基准调整,比基准小的数在基准的左边,比基准大的数在基准的右边
 * @param targetArr 目标数组
 * @param left 左下标
 * @param right 右下标
 */
function partition (targetArr: number[], left: number, right: number): number[] {
  let less = left - 1
  let more = right
  while (left < more) {
    if (targetArr[left] < targetArr[right]) {
      less++
      swap(targetArr, less, left)
      left++
    } else if (targetArr[left] > targetArr[right]) {
      more--
      swap(targetArr, left, more)
    } else {
      left++
    }
  }
  swap(targetArr, more, right)
  return [less + 1, more]
}

/**
 * 快排的递归调用函数
 * @param targetArr 目标数组
 * @param left 左下标
 * @param right 右下标
 */
function quickSortProcess (targetArr: number[], left: number, right: number) {
  if (left < right) {
    const index = partition(targetArr, left, right)
    quickSortProcess(targetArr, left, index[0] - 1)
    quickSortProcess(targetArr, index[1] + 1, right)
  }
}

/**
 * 快速排序
 * @param targetArr 目标数组
 */
function quickSort (targetArr: number[]) {
  const len = targetArr.length
  if (len < 2) {
    return
  }
  quickSortProcess(targetArr, 0, len - 1)
}

/**
 * 归并排序
 * @param targetArr 目标数组
 */
function heapSort (targetArr: number[]) {
  const len = targetArr.length
  if (len < 2) {
    return
  }
  for (let i = 0; i < len; i++) {
    heapSortProcess(targetArr, i)
  }
  let size = len
  swap(targetArr, 0, --size)
  while (size > 0) {
    heapify(targetArr, 0, size)
    swap(targetArr, 0, --size)
  }
}

/**
 * 把数组调整成大根堆
 * @param targetArr 目标数组
 * @param index 下标
 */
function heapSortProcess (targetArr: number[], index: number) {
  while (index > 0) {
    const pIndex = Math.floor((index - 1) / 2)
    if (targetArr[index] > targetArr[pIndex]) {
      swap(targetArr, index, pIndex)
    }
    index = pIndex
  }
}

/**
 * 把数组调整成大根堆
 * @param targetArr 目标数组
 * @param index 下标
 * @param size 要调整的元素个数
 */
function heapify (targetArr: number[], index: number, size: number) {
  let left = 2 * index + 1
  while (left < size) {
    let maxIndex = left + 1 < size && targetArr[left] < targetArr[left + 1] ? left + 1 : left
    maxIndex = targetArr[index] > targetArr[maxIndex] ? index : maxIndex
    if (maxIndex === index) {
      break
    }
    swap(targetArr, maxIndex, index)
    index = maxIndex
    left = 2 * index + 1
  }
}

let arr = arrayGenerator(10, 20)
heapSort(arr)
console.log(arr)
