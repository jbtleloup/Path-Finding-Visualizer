// Performs Bellman Ford's algorithm; returns a randomized array of visited nodes.
// Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function bellmanFord(grid, startNode, finishNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const vertices = getAllNodes(grid).filter(node => !node.isWall);
    const edges = getEdges(vertices, grid);
    // copy the destination node
    // array randomized for the animation
    // this array is for animation only
    visitedNodes.push(...edges.map(edge => edge[1]));
    shuffleArray(visitedNodes);

    for (let i = 0; i < vertices.length - 1; i++) {
        edges.forEach(edge => relax(edge[0], edge[1], edge[1].isWeight));
    }
    // todo: negative cycle
    return visitedNodes;
}

function getEdges(vertices, grid) {
    let unpackedEdges = [];
    let edges = vertices.map(node => getUnvisitedNeighbors(node, grid).map(neighbor => [node, neighbor]));
    for (const neighbors of edges) {
        for (const edge of neighbors) {
            unpackedEdges.push(edge);
        }
    }
    // format [source, destination]
    return unpackedEdges;
}

function relax(source, destination, isWeight) {
    let weight = 1;
    if (isWeight)
        weight = 6;
    if (destination.distance > source.distance + weight) {
        destination.distance = source.distance + weight;
        destination.previousNode = source;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isWall);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the bellmanFord method above.
export function getNodesInShortestPathOrderBF(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}