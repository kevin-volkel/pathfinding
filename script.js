const canvasHeight = 700;
const canvasWidth = 1200;

let canvas = document.getElementById("canvas");

canvas.clientHeight = 700;
canvas.clientWidth = 1200;

const ctx = canvas.getContext("2d");
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

const cols = 48;
const rows = 28;

const cellWidth = canvasWidth / cols;
const cellHeight = canvasHeight / rows;

let grid = [];
for (let i = 0; i < rows; i++) {
  grid.push([]);
  for (let t = 0; t < cols; t++) {
    grid[i].push(0);
  }
}

const fillSquare = (row, col) => {
  const startX = col * cellWidth;
  const startY = row * cellHeight;
  // console.log(grid[row][col]);
  // if (grid[row][col] === 0) {
  //   ctx.fillRect(
  //     startX + ctx.lineWidth,
  //     startY + ctx.lineWidth,
  //     cellWidth - ctx.lineWidth * 2,
  //     cellHeight - ctx.lineWidth * 2
  //   );
  //   grid[row][col] = 1;
  //   console.log(`Filled: ${grid[row][col]}`);
  // } else {
  //   ctx.clearRect(
  //     startX + ctx.lineWidth,
  //     startY + ctx.lineWidth,
  //     cellWidth - ctx.lineWidth * 2,
  //     cellHeight - ctx.lineWidth * 2
  //   );
  //   console.log(`Cleared: ${grid[row][col]}`);
  // }

  if(grid[row][col] === 0) {
    console.log(0)
    grid[row][col] = 1;
  } else {
    console.log(1)
    grid[row][col] = 0;
  }
};

const drawGrid = (grid) => {
  //! draw row lines
  for (let row = 0; row <= rows; row++) {
    ctx.moveTo(0, row * cellHeight);
    ctx.lineTo(canvasWidth, row * cellHeight);
  }
  //! draw col lines
  for (let col = 0; col <= cols; col++) {
    ctx.moveTo(col * cellWidth, 0);
    ctx.lineTo(col * cellWidth, canvasHeight);
  }
  ctx.stroke();

  const filled = [];
  grid.forEach((row, rowIn) => {
    row.forEach((col, colIn) => {
      if (col === 1) filled.push([rowIn, colIn]);
    });
  });
  console.log(filled);

  filled.forEach((each) => fillSquare(each[0], each[1]));
};

drawGrid(grid);

canvas.addEventListener("click", (e) => {
  e.preventDefault();
  const { clientX, clientY } = e;

  let gridX = Math.floor(clientX / cellWidth) - 1;
  let gridY = Math.floor(clientY / cellHeight) - 1;
  console.log(`X: ${gridX}, Y: ${gridY}`);
  fillSquare(gridY, gridX);
  grid[gridY][gridX] = 1;
});
