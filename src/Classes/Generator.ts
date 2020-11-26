export enum CellStates {
  closed = "closed",
  opened = "opened",
  flagged = "flagged",
  explosioned = "explosioned",
}

export const MINE_VALUE = -1

export interface ICellContent {
  value: number;
  state: CellStates;
}

export const GetPlusOneOrBomb = (cell: ICellContent) => {
  if (!cell) {
    return { value: 1, state: CellStates.closed };
  }

  if (cell.value === MINE_VALUE) {
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
          map[i][j] = { value: MINE_VALUE, state: CellStates.closed };
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
  let isOver = false
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
    isOver = true
  }

  return {queue, isOver}
};


export const OpenCell = async (
  map: ICellContent[][],
  i: number,
  j: number,
  rows: number,
  cols: number,
  renderCallback: (map:ICellContent[][]) => Promise<void>
) => {
  let isOver = false
  const cell = map[i][j];
  if (cell && cell.state === CellStates.opened) {
    return {isOver, newMap: map};
  }

  const newMap = map.map((row) => {
    return row.map((col) => {
      return { ...col };
    });
  });

  const globalQueue = [{i, j}]
  const globalUnique:{[propname:string]: boolean} = {}
  let timeStamp = Date.now()
  for (let qNum=0; qNum < globalQueue.length; qNum++) {
    const result = ChangeStatus(newMap, globalQueue[qNum].i, globalQueue[qNum].j, rows, cols);
    isOver = isOver || result.isOver
    result.queue.forEach(q => {
      if (!globalUnique[`${q.i}-${q.j}`]) {
        globalUnique[`${q.i}-${q.j}`] = true
        globalQueue.push(q)
      }
    })

    let long = Date.now() - timeStamp
    if (long > 50) {
      await renderCallback(newMap)
      timeStamp = Date.now()
    }
  }
  return {isOver, newMap};
};
