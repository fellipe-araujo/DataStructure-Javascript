class Heap {
  constructor() {
    this.priorityQueue = [];        // Array de prioridades
    this.auxiliaryStructure = {};   // Guarda a posição de um elemento no array de prioridades para fazer buscas -> O(1)
    this.quantity = 0;
  }

  // Insere um elemento no heap
  insert(element) {
    var newElement = {
      id: element,      // Identificação do nó
      cost: Infinity,   // Custo iniciando em infinito
      source: '',       // Nó pai desse elemento no heap | auxiliar na construção da árvore geradora mínima
    };

    this.priorityQueue.push(newElement);

    this.auxiliaryStructure[element] = {
      position: this.quantity,  // Posição de onde o elemento foi adicionado no array
    };

    this.quantity++;

    return newElement;
  }

  // Retorna a posição de um elemento no array -> O(1).
  getPosition(element) {
    return this.auxiliaryStructure[element]['position'];
  }

  // Altera a referência para os elementos no array
  updateReference(before, after) {
    this.auxiliaryStructure[this.priorityQueue[before]['id']][
      'position'
    ] = after;
  }

  updatePriority(element, newCost, source) {
    // Salva de onde vem a aresta para este nó, com o menor custo
    this.priorityQueue[this.getPosition(element)]['source'] = source;

    // Verifica se o elemento a ser atualizado é igual ao elemento head do heap
    if (element == this.priorityQueue[0]['id']) {
      if (newCost < this.priorityQueue[0]['cost']) {
        this.priorityQueue[0]['cost'] = newCost;
      }
      return;
    }

    // ==== Processo para subir no heap ====

    var child = this.getPosition(element);
    var childCost = newCost;
    var father = Math.floor((child - 1) / 2);
    var fatherCost = this.priorityQueue[father]['cost'];

    // É atrelado ao nó o seu novo custo (ele é menor que o atual)
    this.priorityQueue[child]['cost'] = newCost;

    // Enquanto filho não for o head, e o seu pai for mais custoso, ele sobe no heap -> O(log n)
    while (child > 0 && childCost <= fatherCost) {
      this.updateReference(child, father); // Filho recebe a posição do pai
      this.updateReference(father, child); // Pai recebe a posição do filho

      // Troca de posição no array entre pai e filho
      [this.priorityQueue[father], this.priorityQueue[child]] = [
        this.priorityQueue[child],
        this.priorityQueue[father],
      ];

      // Atribuições para continuar  o processo de subida no heap
      child = father;
      father = Math.floor((father - 1) / 2);

      // Se o filho for 0 é porque ele chegou no head do heap
      if (child == 0) {
        break;
      }

      fatherCost = this.priorityQueue[father]['cost'];  // Atualiza o custo do novo pai
      childCost = this.priorityQueue[child]['cost'];    // Atualiza o custo do novo filho
    }
  }

  //  O(log n)
  removeFirst() {
    // Retira da estrutura auxiliar onde era guardada sua posição
    delete this.auxiliaryStructure[this.priorityQueue[0]['id']];

    // Salva o elemento a ser retirado na variável elementRemoved
    var elementRemoved = this.priorityQueue[0]['id'];

    // Retira o último elemento do array
    var element = this.priorityQueue.pop();
    this.quantity--;

    // Se após a retirada não houver elementos, é retornado o elemento retirado
    if (this.priorityQueue.length === 0) {
      return elementRemoved;
    }

    // ==== Processo para trazer o último elemento do array para o head ====

    this.priorityQueue[0]['id'] = element['id'];
    this.priorityQueue[0]['cost'] = element['cost'];
    this.auxiliaryStructure[element['id']]['position'] = 0;

    // ==== Processo de descer no heap até achar sua posição ====

    var father = 0;
    var child = father * 2 + 1; // Seleciona o filho mais à esquerda

    var N = this.priorityQueue.length;

    while (child < N) {
      if (child < N - 1) {
        // Verifica se o nó tem um irmão
        if (
          this.priorityQueue[father * 2 + 1]['cost'] >
          this.priorityQueue[father * 2 + 2]['cost']
        ) {
          child++;
        }
      }

      if (
        this.priorityQueue[father]['cost'] <
        this.priorityQueue[child]['cost']
      )
        break;

      this.updateReference(child, father);
      this.updateReference(father, child);
      [this.priorityQueue[father], this.priorityQueue[child]] = [
        this.priorityQueue[child],
        this.priorityQueue[father],
      ];

      father = child;

      child = father * 2 + 1;
    }

    return elementRemoved;
  }

  print() {
    console.log(this.priorityQueue);
  }
}

module.exports = Heap;
