const mergeSort = (array, typeParam) => {
  const merge = (left, right) => {
    var result = [];
    var indexLeft = 0;
    var indexRight = 0;

    if (typeParam === 'date') {
      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft].date < right[indexRight].date) {
          result.push(left[indexLeft++]);
        } else {
          result.push(right[indexRight++]);
        }
      }
    } else if (typeParam === 'value') {
      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft].value < right[indexRight].value) {
          result.push(left[indexLeft++]);
        } else {
          result.push(right[indexRight++]);
        }
      }
    }

    while (indexLeft < left.length) {
      result.push(left[indexLeft++]);
    }

    while (indexRight < right.length) {
      result.push(right[indexRight++]);
    }

    return result;
  };

  const mergeSortRec = (array) => {
    var length = array.length;

    if (length === 1) {
      return array;
    }

    var mid = Math.floor(length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  return mergeSortRec(array);
};

const transactions = [
  {
    id: 1,
    expense: true, // É uma despesa?
    value: 100.0,
    date: new Date('02-17-2020'),
  },
  {
    id: 2,
    expense: true, // É uma despesa?
    value: 950.0,
    date: new Date('01-22-2021'),
  },
  {
    id: 3,
    expense: false, // É uma despesa?
    value: 300.0,
    date: new Date('07-11-2020'),
  },
  {
    id: 4,
    expense: true, // É uma despesa?
    value: 230.0,
    date: new Date('02-01-2020'),
  },
  {
    id: 5,
    expense: false, // É uma despesa?
    value: 50.0,
    date: new Date('02-10-2020'),
  },
  {
    id: 6,
    expense: false, // É uma despesa?
    value: 50.0,
    date: new Date('10-30-2019'),
  },
  {
    id: 7,
    expense: false, // É uma despesa?
    value: 50.0,
    date: new Date('11-08-2019'),
  },
  {
    id: 8,
    expense: false, // É uma despesa?
    value: 50.0,
    date: new Date('04-22-2021'),
  },
];

// console.log(transactions);

const newArrayDate = mergeSort(transactions, 'date');
const newArrayValue = mergeSort(transactions, 'value');

console.log('Ordenado por data:')
for (var i = 0; i < newArrayDate.length; i++) {
  console.log(newArrayDate[i]);
}

console.log('Ordenado por valor:')
for (var i = 0; i < newArrayValue.length; i++) {
  console.log(newArrayValue[i]);
}
