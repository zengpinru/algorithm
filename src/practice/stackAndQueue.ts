/**
 * 设计一个有getMin功能的栈
 */
class StackOfGetMin {
  private stackData: number[]
  private stackMin: number[]
  constructor () {
    this.stackData = []
    this.stackMin = []
  }
  public pop(): number|void {
    if (this.stackData.length === 0) {
      return null
    } else {
      this.stackMin.pop()
      return this.stackData.pop()
    }
  }
  public push(num): number|void {
    if (this.stackData.length === 0) {
      this.stackData.push(num)
      this.stackMin.push(num)
    } else {
      const temp = this.stackMin[this.stackMin.length - 1];
      const minNum = temp <= num ? temp : num
      this.stackData.push(num)
      this.stackMin.push(minNum)
    }
    return num
  }
  public getMin(): number|void {
    const len = this.stackMin.length
    if (len === 0) {
      return null
    } else {
      return this.stackMin[len - 1]
    }
  }
}
// const test1 = new StackOfGetMin()
// console.log(test1.getMin())
// test1.push(1)
// test1.push(5)
// test1.push(2)
// console.log(test1.getMin())
// test1.pop()
// test1.pop()
// console.log(test1.getMin())

/**
 * 由两个栈组成的队列
 */
class TwoStacksQueue {
  private stackPush: number[]
  private stackPop: number[]
  constructor() {
    this.stackPush = []
    this.stackPop = []
  }
  public add(num): void {
    this.stackPush.push(num)
    this.pushToPop()
  }
  public poll(): number|void {
    if (this.isEmpty()) {
      return null
    } else {
      this.pushToPop()
      return this.stackPop.pop()
    }
  }
  private isEmpty(): boolean {
    if (this.stackPush.length === 0 && this.stackPop.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  private pushToPop(): void {
    if (this.stackPop.length === 0) {
      while (this.stackPush.length !== 0) {
        this.stackPop.push(this.stackPush.pop())
      }
    }
  }
}
// const twoStacksQueue = new TwoStacksQueue()
// twoStacksQueue.add(1)
// twoStacksQueue.add(2)
// twoStacksQueue.add(3)
// console.log(twoStacksQueue.poll())
// twoStacksQueue.add(4)
// console.log(twoStacksQueue.poll())
// console.log(twoStacksQueue.poll())
// console.log(twoStacksQueue.poll())
// console.log(twoStacksQueue.poll())
// console.log(twoStacksQueue.poll())

/**
 * 仅用递归函数和栈逆序一个栈
 */
function getAndRemoveLastElement(stack: number[]): number {
  const res = stack.pop()
  if (stack.length === 0) {
    return res
  } else {
    const last = getAndRemoveLastElement(stack)
    stack.push(res)
    return last
  }
}
function reverseStack(stack: number[]): void {
  if (stack.length === 0) {
    return
  }
  const i = getAndRemoveLastElement(stack)
  reverseStack(stack)
  stack.push(i)
}
// const stackTest = [1, 2, 3]
// reverseStack(stackTest)
// console.log(stackTest)

/**
 * 用一个栈实现另一个栈的排序
 */
function sortStackByStack(stackData: number[]): number[] {
  const stackHelp = [];
  let temp: number;
  while (stackData.length !== 0) {
    temp = stackData.pop()
    if (stackHelp.length === 0) {
      stackHelp.push(temp)
    } else {
      while (stackHelp.length !== 0 && temp > stackHelp[stackHelp.length - 1]) {
        stackData.push(stackHelp.pop())
      }
      stackHelp.push(temp)
    }
  }
  return stackHelp
}
// console.log(sortStackByStack([23, 1, 3, 44, 12, 64, 99, 1]))

/**
 * 求平方根
 */
function sqrt(num: number): number {
  let left = 0
  let right = num
  let mid = (left + right) / 2
  let res = mid * mid
  const precision = 0.0000001
  while (Math.abs(res - num) >= precision) {
    if (res > num) {
      right = mid
    } else {
      left = mid
    }
    mid = (left + right) / 2
    res = mid * mid
  }
  return mid;
}
// console.log(sqrt(2))
