import generator from "sudoku";

/*
  Generate a sudoku with the format

  {rows: [{cols: [{row: 0, col: 0, value: 1, readonly: true}, ...]}, ...]}
*/
export function generateSudoku() {
  const fromURL = extractURLData();
  const raw = fromURL ? fromURL.raw : generator.makepuzzle();
  const rawSolution = generator.solvepuzzle(raw);
  console.log("data:" + raw);
  const formatted = raw.map(e => (e === null ? null : e + 1));
  const formattedSolution = rawSolution.map(e => e + 1);
  console.log(formattedSolution);
  const result = {
    raw,
    rows: [],
    solution: formattedSolution,
    startTime: new Date(),
    solvedTime: null,
    challengerStartTime: fromURL && new Date(fromURL.startTime),
    challengerSolvedTime: fromURL && new Date(fromURL.solvedTime)
  };
  var k = 0;
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = formatted[9 * i + j];

      const col = {
        row: i,
        col: j,
        value,
        rawindex: k,
        answered: null,
        readonly: value !== null
      };
      row.cols.push(col);
      k++;
    }
    result.rows.push(row);
  }
  console.log(result.rows);
  return result;
}

export function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat();

  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== sudoku.solution[i]) {
      return false;
    }
  }

  return true;
}

export function checkAnswer(answer, index, sudoku) {
  if (sudoku.solution[index] === answer) {
    return true;
  }
}

export function shareURL(sudoku) {
  const data = {
    raw: sudoku.raw,
    startTime: sudoku.startTime,
    solvedTime: sudoku.solvedTime
  };
  const query = btoa(JSON.stringify(data));

  return document.location.href.replace(/\?.$/, "") + `?sudoku=${query}`;
}

function extractURLData() {
  const match = document.location.search.match(/sudoku=([^&]+)/);
  if (match) {
    return JSON.parse(atob(match[1]));
  }
  return null;
}
