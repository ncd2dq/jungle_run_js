class Obstacle{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        
        this.self_image = loadImage('assets/obstacles/obstacle_block1.png');
        
        this.resized_x = 100;
        this.resized_y = 100;
        this.image_blank_space = 5;
        
        this.length = 92.5;
        this.width = 93.75;
        
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
/*        //top left
        ellipse(
            this.x + this.image_blank_space, 
            this.y + this.image_blank_space,2,2);
        
        //bottom left
        ellipse(
            this.x + this.image_blank_space, 
            this.y + this.image_blank_space + this.resized_y - (this.image_blank_space * 2.5),2,2);
        
        //bottom right
        ellipse(
            this.x + this.resized_x - (this.image_blank_space * 1.25), 
            this.y + this.image_blank_space + this.resized_y - (this.image_blank_space * 2.5),2,2);
        
        let length = this.y + this.image_blank_space + this.resized_y - (this.image_blank_space * 2.5);
        
        let width = this.x + this.resized_x - (this.image_blank_space * 1.25) - this.x + this.image_blank_space;
        console.log(length, width);*/
    }
    
    run(){
        this.update();
        this.display();
    }
}