const findLowestCostNode = (costs, processed) => {
  const knownNodes = Object.keys(costs);

  const lowestCostNode = knownNodes.reduce((lowest, node) => {
    if (lowest === null && !processed.includes(node)) {
      lowest = node;
    }
    if (costs[node] < costs[lowest] && !processed.includes(node)) {
      lowest = node;
    }
    return lowest;
  }, null);

  return lowestCostNode;
};

const dijkstra = (graph, sourceNode, targetNode) => {
  // rastreia o custo mais baixo para chegar a cada nó
  const trackedCosts = graph[sourceNode];
  trackedCosts[targetNode] = Infinity;
  console.log('Initial `costs`: ');
  console.log(trackedCosts);

  // rastrear caminhos
  const trackedNeighbors = {};
  trackedNeighbors[targetNode] = null;
  for (var child in graph[sourceNode]) {
    trackedNeighbors[child] = sourceNode;
  }
  console.log('Initial `neighbors`: ');
  console.log(trackedNeighbors);

  // rastreia nós que já foram processados
  const processedNodes = [];

  // Define o nó inicial. Escolhe o nó de menor custo
  var node = findLowestCostNode(trackedCosts, processedNodes);
  console.log('Initial `node`: ', node);

  console.log('while loop starts: ');
  while (node) {
    console.log(`***** 'currentNode': ${node} *****`);
    var costToReachNode = trackedCosts[node];
    var childrenOfNode = graph[node];

    for (var child in childrenOfNode) {
      var costFromNodetoChild = childrenOfNode[child];
      var costToChild = costToReachNode + costFromNodetoChild;

      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild;
        trackedNeighbors[child] = node;
      }

      console.log('`trackedCosts`', trackedCosts);
      console.log('`trackedNeighbors`', trackedNeighbors);
      console.log('----------------');
    }

    processedNodes.push(node);

    node = findLowestCostNode(trackedCosts, processedNodes);
  }
  console.log('while loop ends: ');

  var optimalPath = [targetNode];
  var neighbor = trackedNeighbors[targetNode];
  while (neighbor) {
    optimalPath.unshift(neighbor);
    neighbor = trackedNeighbors[neighbor];
  }

  const results = {
    distance: trackedCosts[targetNode],
    path: optimalPath,
  };

  return results;
};

// EXEMPLO PRÁTICO
const graph = {
  A: { B: 5, C: 2 },
  B: { D: 4, E: 2 },
  C: { B: 8, E: 7, F: 9 },
  D: { E: 6, G: 3 },
  E: { G: 1, F: 3 },
  F: {},
  G: {},
};

console.log(dijkstra(graph, 'A', 'F'));
