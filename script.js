const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
/*console.log(gameArea);*/
startScreen.addEventListener("click", start);



let player = { speed: 5, score: 0 ,timeCount:0};



let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    Attack();
  }
});

function Attack() {
  let laser = document.createElement("div");
  laser.classList.add("laser");
  gameArea.appendChild(laser);

  let ship = document.querySelector(".ship");
  let laserSound = new Audio("laser_sound.mp3");
  laserSound.play();

  laser.style.left = ship.offsetLeft + 20 + "px";
  laser.style.top = ship.offsetTop + "px";

  let laserInterval = setInterval(function () {
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function (enemy) {
      if (isCollide(laser, enemy)) {
        
        let explosionSound = new Audio("explosion_sound.mp3");
        explosionSound.play();
        
        enemy.y = -300;
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
       
        laser.remove();
        
        player.score += 100;
        score.innerText = "Score: " + player.score;
      }
    });

    let lasers = document.querySelectorAll(".laser");
    lasers.forEach(function (laser) {
      if (laser.offsetTop > 0) {
        laser.style.top = laser.offsetTop - 5 + "px";
      } else {
        laser.remove();
      }
    });
  }, 20);
}



document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  /*console.log(e.key);
                console.log(keys);*/
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  /*console.log(e.key);
                console.log(keys);*/
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 650) {
      item.y -= 740;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function endGame() {
  let gameOver= new Audio("game_over.wav");
  gameOver.play();
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Final score:" +
    player.score +
    " " +
    "<br>Press again to restar";
}
function moveEnemy(ship) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    if (isCollide(ship, item)) {
      console.log("Bang!");
      endGame();
    }
    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function gamePlay() {
  console.log("here we go");
  let ship = document.querySelector(".ship");
  let road = gameArea.getBoundingClientRect();
  /*console.log(road);*/
  if (player.start) {
    moveLines();
    moveEnemy(ship);

   if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    ship.style.top = player.y + "px";
    ship.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);
    console.log(player.score++);
     player.score++;
    let ps = player.score - 1;
    score.innerText = "Score: " + ps;

   
  }
}
function start() {
  //gameArea.classList.remove('hide');
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);
  player.timeCount=0;


  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let ship = document.createElement("div");
  ship.setAttribute("class", "ship");
  /*ship.innerText="Hey I am ship";*/
  gameArea.appendChild(ship);

  player.x = ship.offsetLeft;
  player.y = ship.offsetTop;

  /* console.log(ship.offsetTop);
                console.log(ship.offsetLeft);*/

  for (x = 0; x < 3; x++) {
    let enemyAstroid = document.createElement("div");
    enemyAstroid.setAttribute("class", "enemy");
    enemyAstroid.y = (x + 1) * 350 * -1;
    enemyAstroid.style.top = enemyAstroid.y + "px";
    enemyAstroid.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyAstroid);
  }
}

