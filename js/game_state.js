//pause functionality

//instructions
//collect these, avoid these
//space bar, click mouse, or tap screen to jump

//game over
class gameState{
    constructor(){
        this.instruction1 = "Collect these coins:";
        this.instruction2 = "Avoid these coins:";
        this.good_coin = loadImage('assets/goldcoins/Coin1.png');
        this.bad_coin = loadImage('assets/goldcoins/eCoin1.png');
        
        this.instruction3 = "Press 'space bar', click your mouse, or tap the screen to jump";
        this.paused = false;
        this.game_over = false;
        this.fell = false;
    }
    
    display_instructions(){
        background(0, 0, 0, 175);
        textSize(15);
        fill(0, 255, 0);
        text(this.instruction1, Canvas_Width / 3 - 75, Canvas_Height / 2 - 70);
        image(this.good_coin, Canvas_Width / 3 - 75 + 140, Canvas_Height / 2 - 88);
        text(this.instruction2, Canvas_Width / 3 - 75, Canvas_Height / 2 + 0);
        image(this.bad_coin, Canvas_Width / 3 - 75 + 130, Canvas_Height / 2 - 20)
        text(this.instruction3, Canvas_Width / 3 - 75, Canvas_Height / 2 + 70);    
    }
    
    final_score_screen(){
        noLoop();
        this.game_over = true;
        background(0, 0, 0, 175);
        textSize(15);
        fill(0, 255, 0);
        text("Your Final Score Was: " + current_score, Canvas_Width / 3 - 75, Canvas_Height / 2 - 70);
        if(this.fell){
            fill(255);
            text("You Fell To Your Death", Canvas_Width / 3 - 75, Canvas_Height / 2 + 0);
        }
        setTimeout(function(){location.reload();}, 3000);
    }
    
    pause(){
        if(this.paused){
            loop();
            this.paused = false;
        } else {
            noLoop();
            this.paused = true;
        }
    } 
}

