import {getAllNodes, sortNodesByDistance, getUnvisitedNeighbors} from "./Dijkstra";

export function bestFirstSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.currentDistance = 0;
    const unvisitedNodes = getAllNodes(grid).map(node => {
        node.isVisited = false;
        return node
    });
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        relax(node, neighbor, neighbor.isWeight, finishNode);
    }
}

function manhattanDistance(source, endNode) {
    return Math.abs(endNode.col - source.col) + Math.abs(endNode.row - source.row);
}

function relax(source, destination, isWeight, finishNode) {
    let weight = 1;
    if (isWeight)
        weight = 6;
    const g = weight;
    const h = manhattanDistance(destination, finishNode);
    const f = g + h;
    if (destination.distance > f) {
        destination.distance = f;
        destination.previousNode = source;
    }
}