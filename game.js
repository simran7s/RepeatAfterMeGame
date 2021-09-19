var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"] 
var randomChosenColour;
var level = 0;
var started = false;

var wrongMusic = new Audio('/sounds/wrong.mp3')

$(document).keydown(function(){
        if(!started){
                $("#level-title").text("Level " + level);
                nextSequence();
                started = true;
        }
});

$(".btn").click(function(e){

        
        userChosenColour = e.target.id
        console.log(e.target.id, userClickedPattern)

        userClickedPattern.push(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length-1)
 })



function nextSequence(){
        level ++;
        $("#level-title").text("Level " + level)
        console.log("level " + level)
        var randomNumber = Math.floor(Math.random() *4)
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour)
        userClickedPattern = []
}

function playSound(name){
        new Audio("/sounds/"+name+".mp3").play()
}

function animatePress(currentColour){
        $('.'+currentColour).addClass("pressed")
        playSound(currentColour)
       
        setTimeout(() => {
                $('.'+currentColour).removeClass("pressed")      
        }, 100);
}

function checkAnswer(currentLevel){
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
                        console.log("success")

                        if(userClickedPattern.length === gamePattern.length){
                                setTimeout(() => {
                                        nextSequence();
                                }, 1000);
                        }  
        }
        else{
        $("#level-title").text("Game Over, Press Any Key to Restart")
        wrongMusic.play()
        $("body").addClass("game-over")
        setTimeout(() => {
                $("body").removeClass("game-over")
        }, 200);
           startOver();     
        }
        
}

function startOver(){
        
        level = 0;
        gamePattern = [];
        started = false;
        
}