class backgroundParralax{
    constructor(){
        //Each image is width=384 height=216
        //1.5x is w576xh324
        this.b0 = loadImage('assets/background/plx-1.png');
        this.b1 = loadImage('assets/background/plx-2.png');
        this.b2 = loadImage('assets/background/plx-3.png');
        this.b3 = loadImage('assets/background/plx-4.png');
        this.b4 = loadImage('assets/background/plx-5.png');
        
        this.image_resizing = 1.5;
        this.image_count = 5;
        this.speed_offset = 2;
    }
    
    display(){
        image(this.b0, 0, 0, img.width * this.image_resizing, img.height * his.image_resizing);
    }
  
}