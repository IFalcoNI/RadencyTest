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

    if (indexOfHighest[indexOfHighest.length - 1] >= indexOfLower[indexOfLower.length - 1]) {
      start = indexOfLower[0];
      if (start >= indexOfHighest[0]) {
        end = indexOfHighest[indexOfHighest.length - 1];
      } else {
        end = indexOfHighest[0];
      }
    } else {
      end = indexOfLower[indexOfLower.length - 1];
      if (end > indexOfHighest[indexOfHighest.length - 1]) {
        start = indexOfHighest[indexOfHighest.length - 1];
      } else {
        start = indexOfHighest[0];
      }
    }
    for (let j = start + 1; j < end; j++) {
      if (sortedLevels.indexOf(levels[j]) !== -1) {
        sortedLevels.splice(sortedLevels.indexOf(levels[j]), 1);
      }
      if (indexOfHighest[indexOfHighest.length - 1] >= indexOfLower[indexOfLower.length - 1]) {
        if (levels[j] < levels[start]) {
          freeSpaces += levels[start] - levels[j];
          levels[j] = levels[start];
        }
      } else {
        if (levels[j] < levels[end]) {
          freeSpaces += levels[end] - levels[j];
          levels[j] = levels[end];
        }
      }
    }

    sortedLevels.shift();
    indexOfHighest = [];
    indexOfLower = [];
    if (sortedLevels.length < 2) {
      break;
    }
  }
  return freeSpaces + ' free spaces';
}
console.log(loadGrain([32, 12, 37, 15, 17, 15, 24, 26, 44, 34, 28, 25, 2, 8, 17, 41, 26, 17, 29, 27, 27, 28])); //257
// console.log(loadGrain([42, 44, 49, 2, 24, 40, 4, 28, 13, 22, 16, 23])); //96
// console.log(loadGrain([10, 45, 44, 41, 35, 28, 12, 35, 8, 40])); //82

// console.log(loadGrain([4, 1, 3])); //2
// console.log(loadGrain([2, 1, 5, 2, 7, 4, 10])); //7
// console.log(loadGrain([2, 0, 1, 5, 2, 7])); //6
// console.log(loadGrain([2, 4, 2])); //0
// console.log(loadGrain([7, 4])); //0
// console.log(loadGrain([])); //0
// console.log(loadGrain([4, 0, 1, 3])); //5
// console.log(loadGrain([3, 1, 2, 1, 1, 3, 2])); //7
// console.log(loadGrain([9, 1, 4, 1, 6, 4, 10])); //29
// console.log(loadGrain([3, 0, 0, 3])); //6
// console.log(loadGrain([10, 9, 8, 12, 5, 5])); //3
// console.log(loadGrain([2, 9, 8, 4, 5, 5, 2])); //1