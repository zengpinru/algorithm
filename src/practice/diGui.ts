/**
 * 递归相关的题目
 */
import { swap } from '../utils/tool'

/**
 * 全排列
 */
function perutation (arr: number[], start: number, end: number) {
  if (start === end) {
    console.log(arr.toString())
  } else {
    for (let i = start; i < end; i++) {
      swap(arr, start, i)
      perutation(arr, start + 1, end)
      swap(arr, start, i)
    }
  }
}

const arr = [1, 2, 3, 4, 5]
perutation(arr, 0, arr.length)
