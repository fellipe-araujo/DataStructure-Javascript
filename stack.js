function Stack() {
  var items = [];

  // Adiciona um novo item à pilha
  this.push = (element) => {
    items.push(element);
  };

  // Remove o item do topo da pilha
  this.pop = () => {
    return items.pop();
  };

  // Retorna o elemento que está no topo da pilha
  this.peek = () => {
    return items[items.length - 1];
  };

  // Informa se a pilha está vazia ou não
  this.isEmpty = () => {
    return items.length === 0;
  };

  // Limpa a pilha
  this.clear = () => {
    items = [];
  };

  // Informa o tamanho da pilha
  this.size = () => {
    return items.length;
  };

  // Imprime a pilha
  this.print = () => {
    console.log(items);
  };
}
