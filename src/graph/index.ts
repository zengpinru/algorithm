const value = [
  [7, 1, 2], // [weigth, from, to]
  [5, 1, 3],
  [8, 2, 4],
  [2, 4, 3],
  [1, 4, 5]
]

/**
 * 图节点
 */
class GraphNode {
  public value: number // 节点的值
  public in: number // 入度
  public out: number // 出度
  public nexts: GraphNode[] // 从该节点出发的下一个节点
  public edges: GraphEdge[] // 与该节点相连的边
  constructor (val: number) {
    this.value = val
    this.in = 0
    this.out = 0
    this.nexts = []
    this.edges = []
  }
}

/**
 * 图的边
 */
class GraphEdge {
  public weight: number // 权重
  public from: GraphNode // 边的起节点
  public to: GraphNode // 边的终节点
  constructor (weight: number, from: GraphNode, to: GraphNode) {
    this.weight = weight
    this.from = from
    this.to = to
  }
}

/**
 * 图
 */
class Graph {
  public nodes: Map<number, GraphNode> // 节点map
  public edges: Set<GraphEdge> // 边集合
  constructor () {
    this.nodes = new Map()
    this.edges = new Set()
  }
  /**
   * 广度优先遍历
   * @param node 开始遍历的节点
   */
  public bfs (node: GraphNode): void {
    if (!node) {
      return
    }
    const queue: GraphNode[] = [] // 队列
    const set: Set<GraphNode> = new Set() // 用来判断节点是否有进过队列
    queue.push(node)
    set.add(node)
    while (queue.length !== 0) {
      const cur = queue.shift()
      console.log(cur.value)
      for (const val of cur.nexts) {
        if (!set.has(val)) {
          set.add(val)
          queue.push(val)
        }
      }
    }
  }
  /**
   * 深度优先遍历
   * @param node 开始遍历的节点
   */
  public dfs (node: GraphNode): void {
    if (!node) {
      return
    }
    const stack: GraphNode[] = [] // 栈
    const set: Set<GraphNode> = new Set() // 用来判断节点是否有进过栈
    stack.push(node)
    set.add(node)
    console.log(node.value)
    while (stack.length !== 0) {
      const cur = stack.pop()
      for (const val of cur.nexts) {
        if (!set.has(val)) {
          stack.push(cur)
          stack.push(val)
          set.add(val)
          console.log(val.value)
          break
        }
      }
    }
  }
  /**
   * 拓扑排序
   * @param graph 图
   */
  public topologySort (graph: Graph) {
    const inMap: Map<GraphNode, number> = new Map()
    const zeroInQueue: GraphNode[] = []
    // 把所有的节点的入度信息都注册到inMap中,把入度为0的节点放进zeroInQueue队列中
    for (const node of graph.nodes.values()) {
      inMap.set(node, node.in)
      if (node.in === 0) {
        zeroInQueue.push(node)
      }
    }
    const result: number[] = []
    while (zeroInQueue.length !== 0) {
      const cur = zeroInQueue.shift() // 从队列里取出一个节点
      result.push(cur.value) // 把节点的值存到结果数组中
      // 遍历当前节点的所有下一节点,在inMap中把所有对应的一下个节点的入度-1,并把入度为0的节点重新推到队列中
      for (const next of cur.nexts) {
        inMap.set(next, inMap.get(next) - 1)
        if (inMap.get(next) === 0) {
          zeroInQueue.push(next)
        }
      }
    }
    return result
  }
}

/**
 * 创建图
 * @param val 要创建图的值
 */
function createGraph (val: number[][]): Graph {
  const graph = new Graph()
  for (let i = 0; i < val.length; i++) {
    const weight = val[i][0]
    const from = val[i][1]
    const to = val[i][2]
    // 判断是否有起始节点,没有则创建
    if (!graph.nodes.has(from)) {
      graph.nodes.set(from, new GraphNode(from))
    }
    // 判断是否有终节点,没有则创建
    if (!graph.nodes.has(to)) {
      graph.nodes.set(to, new GraphNode(to))
    }
    const fromNode = graph.nodes.get(from)
    const toNode = graph.nodes.get(to)
    // 创建边
    const newEdge = new GraphEdge(weight, fromNode, toNode)
    fromNode.nexts.push(toNode)
    // 起始节点的出度加1
    fromNode.out++
    // 终节点的入度加1
    toNode.in++
    fromNode.edges.push(newEdge)
    graph.edges.add(newEdge)
  }
  return graph
}

const g = createGraph(value)
console.log(g.topologySort(g))
