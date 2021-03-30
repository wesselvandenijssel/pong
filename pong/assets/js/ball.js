class Ball extends Rectangle
{
    constructor(x=0, y=0, color='white') {
        super(x, y, 24, 24);
        this.color  = color;
        this.speed  = 0;
        this.startX = x;
        this.startY = y;
        this.angle  = 0;
        this.locked = false;
        this.out    = false;
    }
}
