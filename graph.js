import Dictionary from './dictionary';

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
}
