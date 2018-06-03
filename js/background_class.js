class backgroundParralax{
    constructor(){
        //Each image is width=384 height=216
        //images are 16x16 pixels
        //there are 39x items in the sprite sheet for tiles
        //there are 19y items in the sprite sheet for tiles
        
        //floor is 9x units - this is 144 pixels per unit, need about 5.3 to always be on screen
        //floor is 2y units
        this.b0 = loadImage('assets/background/plx-1.png');
        this.b1 = loadImage('assets/background/plx-2.png');
        this.b2 = loadImage('assets/background/plx-3.png');
        this.b3 = loadImage('assets/background/plx-4.png');
        this.b4 = loadImage('assets/background/plx-5.png');
        
        this.grass = loadImage('assets/background/extract_floor.png');
        
        this.initial_width = 384;
        this.image_resizing = 2;
        
        this.b0x = 0;
        this.b1x = 0;
        this.b2x = 0;
        this.b3x = 0;
        this.b4x = 0;
        
        this.b0x2 = this.initial_width * this.image_resizing;
        this.b1x2 = this.initial_width * this.image_resizing;
        this.b2x2 = this.initial_width * this.image_resizing;
        this.b3x2 = this.initial_width * this.image_resizing;
        this.b4x2 = this.initial_width * this.image_resizing;
        
        this.floor_length = 300;
        this.floor_x = 0;
        this.floor_x2 = this.floor_length;
        this.floor_x3 = this.floor_length * 2;
        this.floor_x4 = this.floor_length * 3;
        this.floor_y = Canvas_Height - 65;
        
        this.y_standard = Canvas_Height - 190; //the floor_y_standard is the height at which the hero is standing on the floor

        this.normal_speed = 4;
        this.powerup_speed = 10;
        this.speed = 4;
        
        this.speed_reduction = 0.5;
        this.floor_bottom_speed = this.speed * (1 + this.speed_reduction);
    }
    
    loop_background_display(){
        if(this.b4x + this.initial_width * this.image_resizing < 0){
            this.b4x = this.b4x2 + this.initial_width * this.image_resizing;
        } else if(this.b4x2 + this.initial_width * this.image_resizing < 0){
            this.b4x2 = this.b4x + this.initial_width * this.image_resizing;
        }
        
        if(this.b3x + this.initial_width * this.image_resizing < 0){
            this.b3x = this.b3x2 + this.initial_width * this.image_resizing;
        } else if(this.b3x2 + this.initial_width * this.image_resizing < 0){
            this.b3x2 = this.b3x + this.initial_width * this.image_resizing;
        }
        
        if(this.b2x + this.initial_width * this.image_resizing < 0){
            this.b2x = this.b2x2 + this.initial_width * this.image_resizing;
        } else if(this.b2x2 + this.initial_width * this.image_resizing < 0){
            this.b2x2 = this.b2x + this.initial_width * this.image_resizing;
        }
        
        if(this.b1x + this.initial_width * this.image_resizing < 0){
            this.b1x = this.b1x2 + this.initial_width * this.image_resizing;
        } else if(this.b1x2 + this.initial_width * this.image_resizing < 0){
            this.b1x2 = this.b1x + this.initial_width * this.image_resizing;
        }
        
        
    }
    
    loop_floor_display(){
        if(this.floor_x + this.floor_length < 0){
            this.floor_x = this.floor_x4 + this.floor_length;
        } else if(this.floor_x2 + this.floor_length < 0){
            this.floor_x2 = this.floor_x + this.floor_length;
        } else if(this.floor_x3 + this.floor_length < 0){
            this.floor_x3 = this.floor_x2 + this.floor_length;
        } else if(this.floor_x4 + this.floor_length < 0){
            this.floor_x4 = this.floor_x3 + this.floor_length;
        }
    }
    
    update(){
        if(normal){
            this.speed = this.normal_speed;
        } else {
            this.speed = this.powerup_speed;
        }
        
        this.b4x -= this.speed;
        this.b4x2 -= this.speed;
        
        this.b3x -= this.speed * this.speed_reduction;
        this.b3x2 -= this.speed * this.speed_reduction;
        
        this.b2x -= this.speed * Math.pow(this.speed_reduction, 2);
        this.b2x2 -= this.speed * Math.pow(this.speed_reduction, 2);
        
        this.b1x -= this.speed * Math.pow(this.speed_reduction, 3);
        this.b1x2 -= this.speed * Math.pow(this.speed_reduction, 3);
        
        this.floor_x -= this.speed * (1 + this.speed_reduction);
        this.floor_x2 -= this.speed * (1 + this.speed_reduction);
        this.floor_x3 -= this.speed * (1 + this.speed_reduction);
        this.floor_x4 -= this.speed * (1 + this.speed_reduction);
    }
    
    display_floor(){
        image(this.grass, 
              [this.floor_x],[this.floor_y + global_y_offset],  //where to draw on canvas  
              [8 * 39],[8 * 19],    //resizinig of image  
              [0],[180],    // subset image position
              [150],[100])
        
        image(this.grass, 
              [this.floor_x2],[this.floor_y + global_y_offset],  //where to draw on canvas  
              [8 * 39],[8 * 19],    //resizinig of image  
              [0],[180],    // subset image position
              [150],[100])
        
        image(this.grass, 
              [this.floor_x3],[this.floor_y + global_y_offset],  //where to draw on canvas  
              [8 * 39],[8 * 19],    //resizinig of image  
              [0],[180],    // subset image position within larger image
              [150],[100]) //no fucking idea what this shit is
        
        image(this.grass, 
              [this.floor_x4],[this.floor_y + global_y_offset],  //where to draw on canvas  
              [8 * 39],[8 * 19],    //resizinig of image  
              [0],[180],    // subset image position within larger image
              [150],[100]) //no fucking idea what this shit is
    }
    
    display_parralax(){
        //first set of images
        image(this.b0, this.b0x, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);

        image(this.b0, this.b0x2, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        
        
        image(this.b1, this.b1x, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        
        image(this.b1, this.b1x2, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        
        
        image(this.b2, this.b2x, 0, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        
        image(this.b2, this.b2x2, 0, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        
        
        image(this.b3, this.b3x, 0, this.b3.width * this.image_resizing, this.b3.height * this.image_resizing);
        
        image(this.b3, this.b3x2, 0, this.b3.width * this.image_resizing, this.b3.height * this.image_resizing);
        
        
        image(this.b4, this.b4x, 0, this.initial_width * this.image_resizing, this.b4.height * this.image_resizing);
        
        image(this.b4, this.b4x2, 0, this.initial_width * this.image_resizing, this.b4.height * this.image_resizing);
    }
    
    run(){
        this.display_parralax();
        this.display_floor();
        this.update();
        this.loop_background_display();
        this.loop_floor_display();
    }
  
}