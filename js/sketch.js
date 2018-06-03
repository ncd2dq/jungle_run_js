let Canvas_Width = 576;
let Canvas_Height = 324;

let current_score = 0;

let backgroundObject;

function setup() {
    let canvas = createCanvas(Canvas_Width, Canvas_Height);
    canvas.parent('sketch-holder');
    backgroundObject = new backgroundParralax();
}


function draw() {
    background(0, 0, 0);
        
    image(backgroundObject.b0, 0, 0);
    
    display_game_data();
    current_score++;
 
}

//Javascript HTML interface
function display_game_data(){    
    let scoreElement = document.getElementById("score_dom");
    scoreElement.innerHTML = "Score: " + current_score;
}

// User input
function keyPressed(){
    if (keyCode === LEFT_ARROW){
        //direction = [-1, 0];
        theta_change = -5;
        
    } else if (keyCode === RIGHT_ARROW){
        //direction = [1, 0];
        theta_change = 5;
        
    } else if (keyCode === DOWN_ARROW){
        ship.boosting = true;
        ship.forward = true;
        
    } else if (keyCode === UP_ARROW){
        ship.boosting = true;
        ship.forward = false;
        
    } else if (keyCode == 32){ //the spacebar

    } else if (keyCode == 80){ //the 'p' key

    }
}