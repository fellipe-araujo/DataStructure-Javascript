const Dictionary = require('./dictionary')
const Queue = require('./queue')

function Graph() {
  var vertices = [];
  var adjList = new Dictionary();

  // Adiciona um novo vértice
  this.addVertex = function (v) {
    vertices.push(v);
    adjList.set(v, []);
  };

  // Adiciona uma nova aresta
  this.addEdge = function (v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };

  this.structureGraph = function() {
    return adjList.getItems();
  }

  // Lista de Adjacências
  this.adjacencyList = function () {
    var s = '';

    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' -> ';

      var neighbors = adjList.get(vertices[i]);

      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };

  var initializeColor = function () {
    var color = [];

    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };

  this.bfs = function (v, visit) {
    var color = initializeColor();
    var queue = new Queue();

    queue.enqueue(v);

    while (!queue.isEmpty()) {
      var u = queue.dequeue();
      var neighbors = adjList.get(u);

      color[u] = 'blue';

      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];

        if (color[w] === 'white') {
          color[w] = 'blue';
          queue.enqueue(w);
        }
      }
      visit(u);
    }
  };

  this.dfs = function (visit) {
    var color = initializeColor();

    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, visit);
      }
    }
  };

  var dfsVisit = function (u, color, visit) {
    color[u] = 'blue';
    visit(u);
  
    var neighbors = adjList.get(u);

    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];

      if (color[w] === 'white') {
        dfsVisit(w, color, visit);
      }
    }
  };
}

function visitVertex(value) {
  console.log('Visited vertex: ' + value);
}

// EXEMPLO PRÁTICO
var graph = new Graph();
var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (var i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log('BUSCA EM PROFUNDIDADE');
// graph.dfs(visitVertex)

// console.log('\nBUSCA EM LARGURA');
// graph.bfs(vertices[0], visitVertex)

console.log(graph.structureGraph());