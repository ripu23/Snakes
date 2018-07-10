var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");

//create the unit

var box = 32;
var ground = new Image();
ground.src = "img/ground.png";

var foodImg = new Image();
foodImg.src = "img/food.png";

var dead = new Audio();
var eat = new Audio();
var left = new Audio();
var right = new Audio();
var up = new Audio();
var down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/dead.mp3";
left.src = "audio/dead.mp3";
right.src = "audio/dead.mp3";
up.src = "audio/dead.mp3";
down.src = "audio/dead.mp3";

//create the snake

var snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//Create the food

var food = {
    x : Math.floor(Math.random() * 17 +1) * box,
    y : Math.floor(Math.random() * 15 +3) * box
};

var score = 0;

//Control the snake

var d;
document.addEventListener("keydown", direction);

function direction() {
    if(event.keyCode == 37 && d != "RIGHT"){
        right.play();
        d= "LEFT";  
    }else if(event.keyCode == 38 && d != "DOWN"){
        down.play();
        d= "UP";        
    }else if(event.keyCode == 39 && d != "LEFT"){
        left.play();
        d= "RIGHT";
    }else if(event.keyCode == 40 && d != "UP"){
        up.play();
        d= "DOWN";
    }
}

//draw everything to the canvas

function draw() {
    ctx.drawImage(ground, 0, 0);
    for( var i = 0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0) ? "green" : "white";
        ctx.fillRect( snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    //OLD HEAD POSITION
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
    
    
    // direction
    if(d == "LEFT") snakeX -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "UP") snakeY -= box;
    if(d == "DOWN") snakeY += box;
    
    //if the snake eats food
    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        score++;
        food = {
            x : Math.floor(Math.random() * 17 +1) * box,
            y : Math.floor(Math.random() * 15 +3) * box
        }
    }else{
        snake.pop();
    }
    
    var newHead = {
        x: snakeX,
        y: snakeY
    }
    //game over 
    
    function collision(newHead, array) {
        for( var i = 0; i < array.length; i++){
            if(newHead.x == array[i].x && newHead.y == array[i].y){
                
                left.src = "";
                right.src = "";
                up.src = "";
                down.src = "";
                return true;
            }
        }
        return false;
    }
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
        clearInterval(game);
    }
    // add new head
    var newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 2*box);
}

//call draw function every 100ms

var game = setInterval(draw, 100);
