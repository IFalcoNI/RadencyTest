function loadGrain(levels) {
  if (levels.length < 3) {
    return 0 + ' free spaces';
  }
  let freeSpaces = 0;
  let uniqueLevels = [...levels];
  let sortedLevels = uniqueLevels.sort((a, b) => {
    return b - a;
  });

  let indexOfHighest = [];
  let indexOfLower = [];
  let start = 0;
  let end = 0;
  let sumOfGap = 0;
  for (; ;) {

    levels.filter(function (arr, index) {
      if (arr === sortedLevels[0]) {
        indexOfHighest.push(index);
      }
    });
    levels.filter(function (arr, index) {
      if (arr === sortedLevels[1]) {
        indexOfLower.push(index);
      }
    });

    if (Math.max(...indexOfHighest) >= Math.max(...indexOfLower)) {
      start = indexOfLower[0];
      if (start >= indexOfHighest[0]) {
        end = indexOfHighest[indexOfHighest.length - 1];
      } else {
        end = indexOfHighest[0];
      }
    } else {
      start = indexOfHighest[0];
      end = indexOfLower[indexOfLower.length - 1];
    }

    for (let j = start + 1; j < end; j++) {
      sumOfGap += levels[j];
      sortedLevels.splice(sortedLevels.indexOf(levels[j]), 1)
      if (Math.max(...indexOfHighest) >= Math.max(...indexOfLower)) {
        if (levels[j] < levels[j - 1]) {
          freeSpaces += levels[j - 1] - levels[j];
          levels[j] = levels[j - 1];
        }
      } else {
        if (levels[j] < levels[end]) {
          freeSpaces += levels[end] - levels[j];
          levels[j] = levels[end];
        }
      }
    }

    sortedLevels.shift()
    sumOfGap = 0;
    indexOfHighest = [];
    indexOfLower = [];

    if (sortedLevels.length < 2) {
      break;
    }
  }
  return freeSpaces + ' free spaces';
}

console.log(loadGrain([4, 1, 3])); //2
console.log(loadGrain([2, 1, 5, 2, 7, 4, 10])); //7
console.log(loadGrain([2, 0, 1, 5, 2, 7])); //6
console.log(loadGrain([2, 4, 2])); //0
console.log(loadGrain([7, 4])); //0
console.log(loadGrain([])); //0
console.log(loadGrain([4, 0, 1, 3])); //5
console.log(loadGrain([3, 1, 2, 1, 1, 3, 2])); //7
console.log(loadGrain([9, 1, 4, 1, 6, 4, 10])); //29
console.log(loadGrain([3, 0, 0, 3])); //6
console.log(loadGrain([10, 9, 8, 12, 5, 5])); //3
console.log(loadGrain([2, 9, 8, 4, 5, 5, 2])); //1

