class UnionFind<T> {
  public fatherMap: Map<T, T>
  public sizeMap: Map<T, number>
  constructor () {
    this.fatherMap = new Map()
    this.sizeMap = new Map()
  }
  public makeSets (nodes: T[]) {
    this.fatherMap.clear()
    this.sizeMap.clear()
    for (const node of nodes) {
      this.fatherMap.set(node, node)
      this.sizeMap.set(node, 1)
    }
  }
  public isSameSet (a: T, b: T) {
    return this.findHead(a) === this.findHead(b)
  }
  public union (a: T, b: T) {
    if (!a || !b) {
      return
    }
    const aHead = this.findHead(a)
    const bHead = this.findHead(b)
    if (aHead !== bHead) {
      const aSetSize = this.sizeMap.get(aHead)
      const bSetSize = this.sizeMap.get(bHead)
      if (aSetSize <= bSetSize) {
        this.fatherMap.set(aHead, bHead)
        this.sizeMap.set(bHead, aSetSize + bSetSize)
      } else {
        this.fatherMap.set(bHead, aHead)
        this.sizeMap.set(aHead, aSetSize + bSetSize)
      }
    }
  }
  private findHead (node: T) {
    let father = this.fatherMap.get(node)
    if (father !== node) {
      father = this.findHead(father)
    }
    this.fatherMap.set(node, father)
    return father
  }
}
