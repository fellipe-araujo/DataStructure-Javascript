function Dictionary() {
  var items = {};

  // Adiciona um novo item ao dicionário
  this.set = (key, value) => {
    items[key] = value;
  };

  // Remove um valor do dicionário usando a chave
  this.delete = (key) => {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };

  // Verifica se a chave existe e retorna um booleano
  this.has = (key) => {
    return items.hasOwnProperty(key);
  };

  // Retorna um valor específico a partir da chave
  this.get = (key) => {
    return this.has(key) ? items[key] : undefined;
  };

  // Remove todos os itens do dicionário
  this.clear = () => {
    items = {};
  };

  // Retorna a quantidade itens contidos no dicionário
  this.size = () => {
    return Object.keys(items).length;
  };

  // Retorna um array com todas as chaves do dicionário
  this.keys = () => {
    return Object.keys(items);
  };

  // Retorna um array com todos os valores do dicionário
  this.values = () => {
    var values = [],
      keys = Object.keys(items);

    for (var i = 0; i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };

  this.getItems = () => {
    return items;
  };
}
