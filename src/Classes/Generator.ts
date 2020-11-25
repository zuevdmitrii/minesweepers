export enum CellStates {
  closed = "closed",
  opened = "opened",
  flagged = "flagged",
  explosioned = "explosioned",
}

export interface ICellContent {
  value: number;
  state: CellStates;
}

export const GetPlusOneOrBomb = (cell: ICellContent) => {
  if (!cell) {
    return { value: 1, state: CellStates.closed };
  }

  if (cell.value === -1) {
    return cell;
  }

  return { ...cell, value: cell.value + 1 };
};

const WalkByNeighbor = (
  map: ICellContent[][],
  i: number,
  j: number,
  rows: number,
  cols: number,
  callback: (cell: ICellContent, i: number, j: number) => ICellContent
) => {
  if (i > 0) {
    map[i - 1][j] = callback(map[i - 1][j], i - 1, j);
    if (j > 0) {
      map[i - 1][j - 1] = callback(map[i - 1][j - 1], i - 1, j - 1);
    }
    if (j < cols - 1) {
      map[i - 1][j + 1] = callback(map[i - 1][j + 1], i - 1, j + 1);
    }
  }

  if (j > 0) {
    map[i][j - 1] = callback(map[i][j - 1], i, j - 1);
  }
  if (j < cols - 1) {
    map[i][j + 1] = callback(map[i][j + 1], i, j + 1);
  }

  if (i < rows - 1) {
    map[i + 1][j] = callback(map[i + 1][j], i + 1, j);
    if (j > 0) {
      map[i + 1][j - 1] = callback(map[i + 1][j - 1], i + 1, j - 1);
    }
    if (j < cols - 1) {
      map[i + 1][j + 1] = callback(map[i + 1][j + 1], i + 1, j + 1);
    }
  }
};

export const IncrementNeighbor = (
  map: ICellContent[][],
  i: number,
  j: number,
  rows: number,
  cols: number
) => {
  WalkByNeighbor(map, i, j, rows, cols, GetPlusOneOrBomb);
};

export const Generator = (
  rows: number,
  cols: number,
  bombs: number,
  blockI: number,
  blockJ: number
) => {
  let countCells = rows * cols - 1;
  let bombLeft = bombs;
  const map: ICellContent[][] = [[]];
  for (let i = 0; i < rows; i++) {
    if (i < rows - 1) {
      map[i + 1] = [];
    }
    for (let j = 0; j < cols; j++) {
      if (i !== blockI || j !== blockJ) {
        const variaty = bombLeft / countCells;
        const isBomb = variaty > 0.9 || variaty > Math.random();
        if (isBomb) {
          bombLeft--;
          map[i][j] = { value: -1, state: CellStates.closed };
          IncrementNeighbor(map, i, j, rows, cols);
        }
      }
      countCells--;
    }
  }

  return map;
};

const ChangeStatus = (
  newMap: ICellContent[][],
  i: number,
  j: number,
  rows: number,
  cols: number,
) => {
  const cell = newMap[i][j];
  if (cell && cell.state === CellStates.opened) {
    return;
  }
  const queue: {i: number, j: number}[] = []
  if (!cell) {
    newMap[i][j] = { value: 0, state: CellStates.opened };
    
    WalkByNeighbor(newMap, i, j, rows, cols, (cell, newI, newJ) => {
      if (!cell || cell.state !== CellStates.opened && cell.state !== CellStates.flagged) {
        queue.push({i: newI, j: newJ})
      }
      return cell;
    });
  } else if (cell.value === 0) {
    newMap[i][j] = { ...newMap[i][j], state: CellStates.opened };
    WalkByNeighbor(newMap, i, j, rows, cols, (cell, newI, newJ) => {
      if (!cell || cell.state !== CellStates.opened && cell.state !== CellStates.flagged) {
        queue.push({i: newI, j: newJ})
      }
      return cell;
    });
  } else if (cell.value > 0) {
    newMap[i][j] = { ...newMap[i][j], state: CellStates.opened };
  } else {
    newMap[i][j] = { ...newMap[i][j], state: CellStates.explosioned };
  }

  return queue
};

export const OpenCell = (
  map: ICellContent[][],
  i: number,
  j: number,
  rows: number,
  cols: number
) => {
  const cell = map[i][j];
  if (cell && cell.state === CellStates.opened) {
    return map;
  }

  const newMap = map.map((row) => {
    return row.map((col) => {
      return { ...col };
    });
  });

  const globalQueue = [{i, j}]
  let qNum = 0
  const globalUnique:{[propname:string]: boolean} = {}

  while (qNum < globalQueue.length) {
    const queue = ChangeStatus(newMap, globalQueue[qNum].i, globalQueue[qNum].j, rows, cols);
    queue.forEach(q => {
      if (!globalUnique[`${q.i}-${q.j}`]) {
        globalUnique[`${q.i}-${q.j}`] = true
        globalQueue.push(q)
      }
    })
    qNum++
  }
  return newMap;
};
