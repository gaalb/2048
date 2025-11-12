export type Board = number[][];
export type Direction = "up" | "down" | "left" | "right";
export type MoveAnim = {
  from: { row: number; col: number };
  to: { row: number; col: number };
  value: number;
};

export const dirMap: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

// helper to create NxN board with all tiles as 0
function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice());
}

// helper to find all empty cells in the board
function emptyCells(board: Board): Array<{ row: number; col: number }> {
  const cells: Array<{ row: number; col: number }> = []; // cells are [{row, col}, {row, col}, ...]
  for (let row = 0; row < board.length; row++) {
    // for each row
    for (let col = 0; col < board[row].length; col++) {
      // for each column
      if (board[row][col] === 0) cells.push({ row, col }); // if cell is empty, add to list
    }
  }
  return cells;
}

// helper to generate a random tile value (2 or 4)
// with 60% chance of being 2 and 40% chance of being 4
function randomTileValue(): number {
  return Math.random() < 0.6 ? 2 : 4;
}

// place a random tile (2 or 4) in a random empty cell
export function placeRandomTile(board: Board): Board {
  const cells = emptyCells(board);
  if (cells.length === 0) return board; // no empty cells, return board as is
  const { row, col } = cells[Math.floor(Math.random() * cells.length)]; // pick random empty cell
  const next = cloneBoard(board); // clone the board to avoid mutating original
  next[row][col] = randomTileValue(); // place random tile
  return next;
}
// create an empty board and place two random tiles
export function seedBoard(size: number): Board {
  let board = createEmptyBoard(size);
  board = placeRandomTile(board);
  board = placeRandomTile(board);
  return board;
}
// compute the score of the board as the sum of all tile values
export function computeScore(board: Board): number {
  return board.flat().reduce((sum, v) => sum + v, 0);
}

// check if the board has any empty cell (0 means empty)
export function hasEmptyCell(board: Board): boolean {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) return true;
    }
  }
  return false;
}

// check if any merge is possible on the board
export function canMerge(board: Board): boolean {
  const n = board.length;
  for (let r = 0; r < n; r++) {
    // for each row
    for (let c = 0; c < n; c++) {
      // for each column
      const v = board[r][c]; // current cell value
      if (v === 0) continue; // skip empty cells
      // check right and down neighbors for possible merge
      if (c + 1 < n && board[r][c + 1] === v) return true;
      if (r + 1 < n && board[r + 1][c] === v) return true;
    }
  }
  return false;
}

// check if any move is possible (either empty cell or merge)
export function hasMove(board: Board): boolean {
  return hasEmptyCell(board) || canMerge(board);
}

// rotate the board counter-clockwise, return new board
function rotateLeft(b: Board): Board {
  const n = b.length,
    out = createEmptyBoard(n);
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) out[n - 1 - c][r] = b[r][c];
  return out;
}

// rotate the board clockwise, return new board
function rotateRight(b: Board): Board {
  const n = b.length,
    out = createEmptyBoard(n);
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) out[c][n - 1 - r] = b[r][c];
  return out;
}

// reverse the rows of the board, return new board
function reverseRows(b: Board): Board {
  return b.map((row) => row.slice().reverse());
}

export function move(
  board: Board,
  dir: Direction
): { next: Board; moves: MoveAnim[]; moved: boolean; merged: boolean } {
  const n = board.length;

  // idea: re-orient the board so that we only need
  // to implement left moves, then restore orientation at the end
  // orient takes the board and returns the oriented version
  // deorient takes the oriented board and returns the original orientation
  const orient = (b: Board) => {
    if (dir === "up") return rotateLeft(b);
    else if (dir === "down") return rotateRight(b);
    else if (dir === "right") return reverseRows(b);
    else return cloneBoard(b);
  };
  const deorient = (b: Board) => {
    if (dir === "up") return rotateRight(b);
    else if (dir === "down") return rotateLeft(b);
    else if (dir === "right") return reverseRows(b);
    else return cloneBoard(b);
  };

  const work = orient(board);
  const workNext = createEmptyBoard(n);

  // We'll record moves in oriented space, then map them back
  const orientedMoves: MoveAnim[] = [];
  let anyMerge = false; // flag to indicate if any merge happened

  for (let r = 0; r < n; r++) {
    // for each row in oriented space
    // collect non-zero values with original columns
    const nonZeros: Array<{ c: number; v: number }> = [];
    for (let c = 0; c < n; c++) {
      const v = work[r][c];
      if (v !== 0) nonZeros.push({ c, v });
    }

    // sweep left with merges
    let targetCol = 0;
    for (let i = 0; i < nonZeros.length; i++) {
      const tile = nonZeros[i];
      if (i + 1 < nonZeros.length && tile.v === nonZeros[i + 1].v) {
        // matches next item in row
        // merge these two into targetCol with doubled value
        orientedMoves.push({
          // first tile move into targetCol
          from: { row: r, col: tile.c },
          to: { row: r, col: targetCol },
          value: tile.v,
        });
        orientedMoves.push({
          // second tile move into the same targetCol
          from: { row: r, col: nonZeros[i + 1].c },
          to: { row: r, col: targetCol },
          value: nonZeros[i + 1].v,
        });
        // set merged tile in workNext to double value
        workNext[r][targetCol] = tile.v * 2;
        i++; // skip the next one (consumed)
        anyMerge = true;
        targetCol++;
      } else {
        // move single tile to targetCol
        orientedMoves.push({
          from: { row: r, col: tile.c },
          to: { row: r, col: targetCol },
          value: tile.v,
        });
        workNext[r][targetCol] = tile.v;
        targetCol++;
      }
    }
    // remaining cells are zero by default
  }

  const restored = deorient(workNext);

  // mapCellBack(row, col) takes a tile’s coordinates (row, col)
  // from the oriented board and returns its corresponding (row, col)
  // position on the original board after undoing the rotation or flip.
  const mapCellBack = (
    row: number,
    col: number
  ): { row: number; col: number } => {
    // Build an empty board and place a marker at (row, col)
    const marker = createEmptyBoard(n);
    marker[row][col] = 1;
    // De-orient the board to find original position
    const back = deorient(marker);
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (back[r][c] === 1) return { row: r, col: c };
    return { row, col }; // fallback (shouldn't happen)
  };

  const moves: MoveAnim[] = orientedMoves.map((m) => ({
    from: mapCellBack(m.from.row, m.from.col),
    to: mapCellBack(m.to.row, m.to.col),
    value: m.value,
  }));

  const moved = !boardsEqual(board, restored);
  return { next: restored, moves, moved, merged: anyMerge };
}

// two boards equal if all their elements are the same at same positions
function boardsEqual(a: Board, b: Board): boolean {
  if (a.length !== b.length) return false;
  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < a[r].length; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

// fetch saved game state from local storage
export function loadGameState(): {
  board: Board; // current board
  prevBoard: Board | null; // previous board for undo
} | null {
  try {
    const raw = localStorage.getItem("savedGameState"); // raw string as stored in LS
    if (!raw) return null;
    const parsed = JSON.parse(raw); // parse to object, we don't know its type yet
    if (!Array.isArray(parsed.board) || parsed.board.length === 0) return null; // sanity check
    return {
      board: parsed.board as Board,
      prevBoard: parsed.prevBoard ?? null,
    };
  } catch {
    return null;
  }
}

export function saveGameState(board: Board, prevBoard: Board | null) {
  try {
    const state = { board, prevBoard };
    localStorage.setItem("savedGameState", JSON.stringify(state)); // serialize to string
  } catch {}
}

export function clearSavedGame() {
  try {
    localStorage.removeItem("savedGameState");
  } catch {}
}
