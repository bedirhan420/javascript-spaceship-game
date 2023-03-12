const score = document.querySelector(".score");
const startScreen = document.querySelector(".starScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start); //başlama ekranına tıklayınca start fonk. döndürür

let player = { speed: 3, score: 0 };
let enemyControlCount;

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault(); //e.preventDefault() kodu, tarayıcının varsayılan davranışını engeller.
  keys[e.key] = true;
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function start(){
    startScreen.classList.add("hide");
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    let ship =document.createElement("div");
    ship.setAttribute("class","ship");
    gameArea.appendChild(ship);

    player.x=ship.offsetLeft;
    player.y=ship.offsetTop;

    for (i = 0; i < 3; i++) {
        
        let enemyChar = document.createElement("div")

        if (enemyControlCount==1) {
            enemyChar.setAttribute("class","alien")
        }
        else{
            enemyChar.setAttribute("class","asroit")
        }
        enemyChar.y = (x + 1) * 350 * -1;
        enemyChar.style.top = enemyCar.y + "px";
        enemyChar.style.backgroundColor = randomColor();
        enemyChar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyChar);
    }

}

function gamePlay() {
    //console.log("here we go");
    let ship = document.querySelector(".ship");
    let road = gameArea.getBoundingClientRect();
    /*console.log(road);*/
    if (player.start) {
      
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
      //console.log(player.score++);
      player.score++;
      let ps = player.score - 1;
      score.innerText = "Score: " + ps;
    }
  }


function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.lefft ||
    a.Rect.lefft > bRect.right
  );
}
/*isColide fonksiyonnu, a ve b adlı iki HTML elementinin dikdörtgen sınırlayıcı kutularının koordinatlarını hesaplar. Bu koordinatlar, elementlerin sayfadaki konumunu ve boyutunu belirler.
getBoundingClientRect() yöntemi, bir HTML elementinin dikdörtgen sınırlayıcı kutusunun boyutunu ve konumunu döndürür.çarptığını anlamak için kullancam*/

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "GAME OVER <br> FINAL SCORE:" + player.score + " " + "<br>RETRY";
}
//oyun bitince sonuç ekranını gösterir

function moveEnemy(ship) {
  let enemy;
  enemyControlCount = Math.floor(Math.random() * 10) + 1;
  if (enemyControlCount == 1) {
    enemy = document.querySelectorAll(".alien");
  } else {
    enemy = document.querySelectorAll(".astroid");
  }

  enemy.forEach(function (item) {
    if (isCollide(ship, item)) {
      //console.log("Bang!");
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
/*rastgele bir şekilde astroid veya uzaylı düşman getirir.Gemiyle çarpışıyor mu diye kontrol edilir.
Daha sonra, item öğesinin y özelliği geminin hız değeri kadar artırılır ve öğenin top stil özelliği de güncellenir. 
Eğer item öğesinin y özelliği 750'den büyükse, öğenin y özelliği 300 azaltılarak  yeniden ayarlanır ve left stil özelliği de rastgele bir değerle güncellenir.
Bu sayede, öğeler sayfada yukarı doğru hareket ederek belirli bir noktada tekrar başa dönerler ve oyun daha uzun süre oynanabilir hale gelir.
*/



