function Queue() {
  var items = [];

  // Adiciona um novo item
  this.enqueue = (element) => {
    items.push(element);
  };

  // Remove um item
  this.dequeue = () => {
    return items.shift();
  };

  // Retorna o primeiro elemento da fila
  this.front = () => {
    return items[0];
  };

  // Verifica se a fila está vazia ou não
  this.isEmpty = () => {
    return items.length === 0;
  };

  // Retorna o tamanho da fila
  this.size = () => {
    return items.length;
  };

  // Imprime a fila
  this.print = () => {
    console.log(items);
  };
}
