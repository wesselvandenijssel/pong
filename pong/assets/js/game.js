class Game
{
    constructor() {
        // Verbinden met de ponggame-canvas (moet iedere frame opnieuw getekend worden)
        this.canvas  = document.getElementById('pong');
        this.context = this.canvas.getContext('2d');  

        // Bal-object aanmaken
        this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 'orange');

        this.players = [
            new Player(20, this.canvas.height/2, 1),
            new Player(this.canvas.width-20, this.canvas.height/2, 2)
        ];

        // Gameloop
        let lastTime;
        const callback = (milliseconds) => {
            if(lastTime) {
                this.update( (milliseconds - lastTime) / 1000 );
                this.draw();
            }
            lastTime = milliseconds;
            window.requestAnimFrame(callback);
        }
        callback();
    }

    update(deltatime) {
        this.ball.position.x += this.ball.velocity.x * deltatime; 
        this.ball.position.y += this.ball.velocity.y * deltatime;

        this.players[0].position.y += this.players[0].velocity.y * deltatime; 
        this.players[1].position.y += this.players[1].velocity.y * deltatime;

        if(this.ball.bottom > this.canvas.height || this.ball.top < 0) {
            this.ball.velocity.y = -this.ball.velocity.y; 
        }

        if(this.ball.right > this.canvas.width || this.ball.left < 0) {
            this.ball.velocity.x = -this.ball.velocity.x; 
        }

    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Tekenen van de bal
        this.drawRectangle(this.context, this.ball);

        for(let i=0; i<this.players.length; i++) {
            this.drawRectangle(this.context, this.players[i]);
        }
        
    }

    drawRectangle(ctx, rect, color='white') {
        ctx.fillStyle = color;
        ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
}