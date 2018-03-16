//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//Set the starting paoint
var x = canvas.width/2;
var y = canvas.height-30;

//Ball
var ballRadius = 9;
var ballColour = "black"
var paddleHeight = 13;

//Move the ball
var dx = 2;
var dy = -2;

//Paddle
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;

//move paddle
var rightPressed = false;
var leftPressed = false;

//brick
var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 57;
var brickHeight = 20;
var brickPadding = 12;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

var score = 0;

var lives = 5;

//sounds
var winningSound = new Audio('sounds/woohoo.wav');
var scoreSound = new Audio('sounds/success.wav');
var gameOverSound = new Audio('sounds/gameover.wav');

//Array for 2D bricks
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {				
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
	drawScore();
	drawLives();
	x += dx;
	y += dy;
	
	if(x + dx > canvas.width-ballRadius || x+dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy++;
			dy = -dy;
		}
	else {
					lives--;
					if(!lives) {
					gameOverSound.play();
					alert("Game Over");
					document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2;
				}
			}
		}	
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup" , keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status ==1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
				dy = -dy;
				b.status = 0;
				score+=10;
				scoreSound.play();
				if(score == brickRowCount*brickColumnCount*10) {
						winningSound.play();
						alert("You Win! Congratulations!");
						document.location.reload();
				}
			}
		}
	}
}
}
function drawScore() {
	ctx.font = "17px Lucida Sans";
	ctx.fillStyle = "#black";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}
//Mouse movement 
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}
function drawLives() {
	ctx.font = "17px Lucida Sans";
	ctx.fillStyle = "#black";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML = "Lives: "+lives;
}
setInterval(draw, 10);