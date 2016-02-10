var KEY_CODE = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
	},
	snake  = document.getElementsByClassName("snake"),
	simpleFood = document.getElementsByClassName("simple_food")[0].style,
	snakeContainer = document.getElementById("snake_container"),
	score = 0,
	counter = 1,
	direction = undefined,
	difficulty,
	movementController,
	fieldWidth = fieldHeight = 570;
	document.getElementById("game_over").hidden = true;
//////////////////////////////////////////////////////////////////
var snakeHeadTopTemp,
snakeHeadLeftTemp,
lastMove = 4,
foodTopTemp, 
foodLeftTemp;
//////////////////////////////////////////////////////////////////
function getDifficultyLevel(){
	difficulty = document.getElementById('difficulty').value;
	return (9-parseInt(difficulty))*60;
}
/////////////////___controllers___/////////////////////////////////
function startMovementController(){
movementController = setInterval(function(){
	switch(direction){
		case 1:
		if(lastMove!==3){
			moveUp();
			lastMove = 1;
		}
		break;
		case 2:
		if(lastMove!==4){
			moveRight();
			lastMove = 2;
		}
		break;
		case 3:
		if(lastMove!==1){
			moveDown(); 
			lastMove = 3;
		}
		break;
		case 4:
		if(lastMove!==2){
			moveLeft();
			lastMove = 4;
		}
		break;
	}
}, getDifficultyLevel());
}
var otherController = setInterval(function(){
	refreshSnakeStatus();
	checkFood();
	if(counter%6==0) throwTemporalBonus();
	checkGameOver();
	checkBonusFood();
}, 10);
//////////////////////////////////////////////////////////////////
window.addEventListener('keydown', handler, false);
//////////////////////////////////////////////////////////////////
function handler(){
	if(difficulty===undefined){
		startMovementController();
	}
	switch(event.keyCode) {
		case KEY_CODE.LEFT:
			if(lastMove!==2)
			direction = 4;
		break;
		case KEY_CODE.UP:
			if(lastMove!==3)
			direction = 1;
		break;
		case KEY_CODE.RIGHT:
			if(lastMove!==4)
			direction = 2;
		break;
		case KEY_CODE.DOWN:
			if(lastMove!==1)
			direction = 3;
		break;
	}
}
//////////////////////////////////////////////////////////////////
function setUpSnake(x, y){
	for(var i=0; i < snake.length; i++){
	snake[i].style.left = x*30 +i*30 + "px";
	snake[i].style.top = y*30 + "px";
	}
};
setUpSnake(3,3);
//////////////////////////////////////////////////////////////////
function adoptBody(snakeHeadLeft, snakeHeadTop){
	for (var i = snake.length - 1; i >= 1; i--) {
		snake[i].style.top = snake[i-1].style.top;
		snake[i].style.left = snake[i-1].style.left;
	};
}
//////////////////////////////////////////////////////////////
function moveUp(){
	adoptBody();
	var temp = parseInt(snake[0].style.top) - 30;
	snake[0].style.top = (temp<0 ? fieldHeight : temp) + "px";
}
//////////////////////////////////////////////////////////////////
function moveRight(){
	adoptBody();
	var temp = parseInt(snake[0].style.left) + 30;
	snake[0].style.left = (temp>fieldWidth ? 0 : temp) + "px";
}
//////////////////////////////////////////////////////////////////
function moveDown(){
	adoptBody();
	var temp = parseInt(snake[0].style.top) + 30;
	snake[0].style.top = (temp>fieldHeight ? 0 : temp) + "px";
}
//////////////////////////////////////////////////////////////////
function moveLeft(){
	adoptBody();
	var temp = parseInt(snake[0].style.left) - 30;
	snake[0].style.left = (temp<0 ? fieldWidth : temp)  + "px";
}
//////////////////////////////////////////////////////////////////
function throwSimpleFood(){
	foodTopTemp = Math.round(Math.random()*19)*30;
	foodLeftTemp = Math.round(Math.random()*19)*30;
	for (var i = snake.length - 1; i >= 1; i--) {
		if((foodTopTemp == snake[i].style.top) &&
		 (foodLeftTemp == snake[i].style.left))
			throwSimpleFood();
	};
	simpleFood.top = foodTopTemp  + "px";
	simpleFood.left = foodLeftTemp  + "px";
}
throwSimpleFood();
//////////////////////////////////////////////////////////////////
function checkFood(){
	if(snakeHeadTopTemp == foodTopTemp &&
	 snakeHeadLeftTemp == foodLeftTemp){
		document.getElementsByClassName("score")[0].innerText = ++score;
		throwSimpleFood();
		growSnake();
		counter++;
	}
}
//////////////////////////////////////////////////////////////////
function refreshSnakeStatus(){
	snakeHeadTopTemp = parseInt(snake[0].style.top);
	snakeHeadLeftTemp = parseInt(snake[0].style.left);
	snake = document.getElementsByClassName("snake");
}
//////////////////////////////////////////////////////////////////
function growSnake(){
	var newBodyElement = document.createElement('div');
	newBodyElement.className = "snake body";
	snakeContainer.appendChild(newBodyElement);
}
//////////////////////////////////////////////////////////////////
function checkGameOver(){
	for (var i = snake.length - 1; i >= 1; i--) {
		if(parseInt(snake[i].style.top) == snakeHeadTopTemp &&
			parseInt(snake[i].style.left) == snakeHeadLeftTemp){
			gameOver();
		}
	};
}
//////////////////////////////////////////////////////////////////
function gameOver(){
	clearInterval(movementController);
	clearInterval(otherController);
		document.getElementById("game_over").hidden = false;
}
//////////////////////////////////////////////////////////////////
var bonusFoodTop, bonusFoodLeft;
var bonusFood = document.getElementsByClassName("bonus")[0].style;

function throwTemporalBonus(){
	placeBonusFood();
	bonusFood.top = bonusFoodTop  + "px";
	bonusFood.left = bonusFoodLeft  + "px";
	for (var i = snake.length - 1; i >= 1; i--) {
		if((bonusFoodTop == snake[i].style.top) &&
		 (bonusFoodLeft == snake[i].style.left))
			placeBonusFood();
	};
	setTimeout(function(){ hideBonusFood(); }, 4000);
	counter = 1;
}

function placeBonusFood(){
	bonusFoodTop = Math.round(Math.random()*19)*30;
	bonusFoodLeft = Math.round(Math.random()*19)*30;
}
//////////////////////////////////////////////////////////////////
function checkBonusFood(){
	if(snakeHeadTopTemp == bonusFoodTop &&
	 snakeHeadLeftTemp == bonusFoodLeft){
		document.getElementsByClassName("score")[0].innerText = score += 10;
		growSnake();
		hideBonusFood();
	}
}
//////////////////////////////////////////////////////////////////
function hideBonusFood(){
	bonusFood.top = bonusFoodTop = "-500px";
	bonusFood.left = bonusFoodLeft = "-500px";
}
