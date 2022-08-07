let score = 0;
let maxScore = 0;
let scoreDiv = document.getElementById("score");
let playField = {
    width: 300, 
    height: 200
};
let bubbles = [];
let interval;
let button = document.getElementById("start");
let field = document.getElementById("field");

function startGame() {
    bubbles = [];
    showButton(false);

    let time = 1000;
    interval = setInterval(createBubble, time);

    score = 0;
    maxScore = 0;
    updateScore();
    animate();
}
function showButton(show) {
    if (show) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
    maxScore++;
    updateScore();
}
function createBubble() {
    let bubble = document.createElement("div");
    field.appendChild(bubble);
    bubble.classList.add("bubble");
    bubble.onclick = function () {
        pop(bubble);
    };
    let colors = ["midnightblue", "darkred", "orange", "yellow", "green", "cornsilk", "magenta"];
    let index = Math.floor(Math.random() * colors.length);
    bubble.style.backgroundColor = colors[index];

    let size = Math.floor(Math.random() * 16) + 25;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    let speed = Math.floor(Math.random() * 2) + 1;
    bubble.speed = speed;

    let playWidth = playField.width - size;
    let left = Math.floor(Math.random() * playWidth);
    let top = playField.height;
    bubble.style.left = left + "px";
    bubble.style.top = top + "px";

    bubble.index = bubbles.length;
    bubbles.push(bubble);

    maxScore++;
    updateScore();
}
function pop(bubble) {
    bubbles[bubble.index] = null;
    bubble.parentNode.removeChild(bubble);
    score++;
    updateScore();
}
function animate() {
    let hitTop = false;
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i];
        if (!bubble) {
            continue;
        }
        let top = parseInt(bubble.style.top);
        top -= bubble.speed;
        bubble.style.top = top + "px";
        if (top <= 0) {
            hitTop = true;
            break;
        }
    }
    if (hitTop) {
        gameOver();
    } else {
        requestAnimationFrame(animate);
    }
}
function gameOver() {
    showButton(true);
    removeBubbles();
    clearInterval(interval);
    updateScore();
    scoreDiv.innerHTML += "<h1>Game Over</h1>";
}
function removeBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i];
        if (!bubble) {
            continue;
        }
        bubble.parentNode.removeChild(bubble);
    }
    bubbles = [];
}
function updateScore() {
    let text = "Bubbles Popped: " + score;
    text += "<br>Total Bubbles: " +maxScore;
    scoreDiv.innerHTML = text;
}