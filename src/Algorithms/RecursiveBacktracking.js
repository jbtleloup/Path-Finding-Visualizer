// todo: comment
export function recursiveBactracking(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    // Everything not in Maze Path is wall
    const mazePath = [];
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    mazePath.push(startNode);
    while (!!visitedNodesInOrder.length) {
        const lastNodeOfStack = visitedNodesInOrder[visitedNodesInOrder.length-1];
        // console.log("lastnode: ", lastNodeOfStack);
        const currentNode = getRandomNeighborFromNode(grid, lastNodeOfStack);
        // console.log("current: ",currentNode);
        if(currentNode) {
            currentNode.isVisited = true;
            mazePath.push(currentNode);
            mazePath.push(getEdgeNode(grid, lastNodeOfStack, currentNode));
            visitedNodesInOrder.push(currentNode);
        } else {
            visitedNodesInOrder.pop();
        }

    }
    // return wall
    return getAllNodes(grid).filter(n => !mazePath.includes(n));

    // start from startNode
    // get neighbour (two nodes in every directions) do some checks
    // maintain stack of visited nodes for algo
    // maintain array of nodes visited plus edges nodes visited
    // put as wall all NOT visited nodes
    // update and return grid

    // Math.random() * (max - min) + min;

}

function getRandomNeighborFromNode(grid, node) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 2][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 2][col]);
    if (col > 0) neighbors.push(grid[row][col - 2]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 2]);
    const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
    // console.log("neighbors: ",unvisitedNeighbors);
    if (unvisitedNeighbors.length) {
        const randomNumber = Math.floor(Math.random() * unvisitedNeighbors.length);
        // console.log("Random Number: ", randomNumber);
        return unvisitedNeighbors[randomNumber];
    } else {
        return undefined;
    }

}

function getEdgeNode(grid, source, destination) {
    const row = destination.row - source.row;
    const col = destination.col - source.col;
    const rowEdgeNode = row > 0 ? source.row+1 : row < 0 ? source.row-1 : source.row;
    const colEdgeNode = col > 0 ? source.col+1 : col < 0 ? source.col-1 : source.col;
    return grid[rowEdgeNode][colEdgeNode];

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