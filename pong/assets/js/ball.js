class Ball extends Rectangle
{
    constructor(x=0, y=0, color) {
        super(x, y, 24, 24, color);
        this.speed  = 0;
        this.startX = x;
        this.startY = y;
        this.angle  = 0;
        this.locked = false;
        this.out    = false;
        this.velocity.x = (getRandomNumBetween(0,1)===1) ? getRandomNumBetween(-50,-150) : getRandomNumBetween(50,150);   
        this.velocity.y = (getRandomNumBetween(0,1)===1) ? getRandomNumBetween(-50,-150) : getRandomNumBetween(50,150);
        this.reset();
    }

    reset(x=this.startX, y=this.startY) {
        this.setPosition(x, y);
        // voeg hier code aan toe die de snelheid van de ball ophoogt

        // voeg hier code aan toe die de hoek van de bal random gaat maken

        this.out = false;
    }

    setPosition(x, y) {
        this.position.x = x;  
        this.position.y = y;
    }
}