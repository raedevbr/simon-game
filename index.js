var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;


document.addEventListener("keypress", event => {
    if (!isGameStarted) {
        nextSequence();
        isGameStarted = true;
    } 
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", event => {

        var userChosenColour = event.target.classList[1];
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
        animatePress(userChosenColour);
        
        validatePattern(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
   var audio = new Audio("./sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(randomChosenColour) {
    var currentColourBtn = document.querySelector("#"+randomChosenColour);
    currentColourBtn.classList.toggle("pressed");
    setTimeout(() => {
        currentColourBtn.classList.toggle("pressed");
    }, 100);
}

function validatePattern(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        document.querySelector("body").classList.toggle("game-over");
        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
        
        setTimeout(() => {
        document.querySelector("body").classList.toggle("game-over");
        }, 200);

        startOver();
    } 
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}