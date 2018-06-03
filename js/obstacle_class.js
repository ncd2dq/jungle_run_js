class Obstacle{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        
        this.self_image = loadImage('assets/obstacles/obstacle_block1.png');
        
        this.resized_x = 100;
        this.resized_y = 100;
        this.image_blank_space = 5;
        
        this.y_standard = y + this.image_blank_space - 155; //the line that can be stood on
        
        this.speed = speed;
    }
    
    update(){
        if(normal){
            this.x -= this.speed;
        } else {
            this.x -= powerupspeed;
        }
    }
    
    display(){
        image(this.self_image,
              this.x, this.y + global_y_offset,
             this.resized_x, this.resized_y);
    }
    
    run(){
        this.update();
        this.display();
    }
}