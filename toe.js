"use strict";

CanvasRenderingContext2D.prototype.circle = function(_x, _y, _r) {
	this.moveTo(_x + _r, _y);
	this.arc(_x, _y, _r, 0, 2 * Math.PI);
};

let turn = 0;
let size = 200;
let complexity = 3;
let canvas = document.getElementById("canvas");
canvas.width = complexity * size;
canvas.height = complexity * size;
let ctx = canvas.getContext("2d");
let win = false;
let done = false;
let MLG = new Audio("MLGHORN.mp3");

let toeField = new Array(complexity);
for (let x = 0; x < toeField.length; x++) {
	let col = toeField[x] = new Array(complexity);
	for (let y = 0; y < col.length; y++) {
		col[y] = 0;
	}
}

function cat () {
      	ctx.fillStyle = "#ddd";
	ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 2);
	ctx.fillStyle = "#000";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle"
	ctx.font = "120px Arial";
	ctx.fillText("Reset", canvas.width / 2, canvas.height / 2);
	
	canvas.addEventListener("click", function() {
					location.reload();
				});
}


const checkWin = (ax, ay, bx, by, cx, cy) => (toeField[ax][ay] != 0 && toeField[ax][ay] == toeField[bx][by] && toeField[bx][by] == toeField[cx][cy]);
function line(sx, sy, ex, ey) {
	ctx.beginPath();
	ctx.moveTo(sx, sy);
	ctx.lineTo(ex, ey);
	ctx.stroke();
}
function checkInARow() {
	ctx.lineWidth = 5;
	for (let n = 0; n < complexity; n++) {
		if (checkWin(0, n, 1, n, 2, n)) {
			line(0, (n + 0.5) * size, complexity * size, (n + 0.5) * size);
			win = true;
		}
	}
	for (let n = 0; n < complexity; n++) {
		if (checkWin(n, 0, n, 1, n, 2)) {
			line(size * n + size / 2, 0, size * n + size / 2, size * complexity);
			win = true;
		}
	}
	if (checkWin(0, 0, 1, 1, 2, 2)) {
		line(0, 0, size * complexity, size * complexity);
		win = true;
	}
	if (checkWin(0, 2, 1, 1, 2, 0)) {
		line(size * complexity, 0,0, size * complexity);
		win = true;
	}
	return win;
}

canvas.addEventListener("click", (event) => {
	const x = Math.floor(event.offsetX / size);
	const y = Math.floor(event.offsetY / size);
	if (!toeField[x][y] && !win) {
		toeField[x][y] = turn % 2 + 1;
		draw();
		turn++;
		
		if (checkInARow()) {
			setInterval(draw, 33);
			MLG.volume = 1;
			MLG.addEventListener("ended", function() {
				done = true;
				canvas.addEventListener("click", function() {
					location.reload();
				});
			});
			MLG.play();
		}
	}
	
 	 if(turn == complexity * complexity && win == false){
	 setTimeout(cat, 2*1000);
	  turn = 0;
 	 }
	
});



function draw() {
	ctx.fillStyle = win ? "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)" : "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 1;
	for (let x = 1; x < complexity; x++) {
		ctx.moveTo(x * size, 0);
		ctx.lineTo(x * size, canvas.height);
	}
	for (let y = 1; y < complexity; y++) {
		ctx.moveTo(0, y * size);
		ctx.lineTo(canvas.width, y * size);
	}
	for (let x = 0; x < toeField.length; x++) {
		for (let y = 0; y < toeField.length; y++) {
			if (toeField[x][y] == 2) {
				ctx.circle((x + 0.5) * size, (y + 0.5) * size, size * 3 / 8);
			} else if (toeField[x][y] == 1) {
				ctx.moveTo(x * size, y * size);
				ctx.lineTo((x + 1) * size, (y + 1) * size);
				ctx.moveTo(x * size, (y + 1) * size);
				ctx.lineTo((x + 1) * size, y * size);
			}
		}
	}
	ctx.stroke();
	checkInARow();
	if (done) {
		ctx.fillStyle = "#ddd";
		ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 2);
		ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"
		ctx.font = "120px Arial";
		ctx.fillText("Reset", canvas.width / 2, canvas.height / 2);
	}
}
draw();
