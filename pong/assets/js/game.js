class Game
{
    constructor() {
        // Verbinden met de ponggame-canvas (moet iedere frame opnieuw getekend worden)
        this.canvas  = document.getElementById('pong');
        this.context = this.canvas.getContext('2d');  

        // Bal-object aanmaken
        this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 'orange');

        // Maak twee spelers aan en stop ze in een array
        this.players = [
            new Player(20, this.canvas.height/2, 1),
            new Player(this.canvas.width-20, this.canvas.height/2, 2)
        ];

        // Maak een Headsup-display aan voor de randen en de score
        this.hud = new Hud(this);

        // Maak een array aan voor de toetsen
        this.keys = [];
        // Vang event op voor toets ingedrukt
        window.addEventListener('KEY_DOWN', (event) => {
            switch(event.detail) {
                case 'ArrowUp':   this.keys[38] = true;   
                break;
                case 38:          this.keys[38] = true;   
                break;
                case 'ArrowDown': this.keys[40] = true;   
                break;
                case 40:          this.keys[40] = true;   
                break;
            }
        });

        // Vang event op voor toets losgelaten
        window.addEventListener('KEY_UP', (event) => {
            switch(event.detail) {
                case 'ArrowUp':   this.keys[38] = false;   
                break;
                case 38:          this.keys[38] = false;   
                break;
                case 'ArrowDown': this.keys[40] = false;   
                break;
                case 40:          this.keys[40] = false;   
                break;
            }
        });

        // Gameloop aanmaken (refresh 60 keer per seconde)
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

    checkInput(player, ball) {
        // Welke player is dit?
        switch(player.id) {
            case 1:     // Human player (links)
                        player.velocity.y  = 0;
                        player.velocity.y += (this.keys[38]===true) ? -400 : 0;
                        player.velocity.y += (this.keys[40]===true) ?  400 : 0;
            break;
            case 2:     // Computer player (rechts)
                        player.position.y = ball.position.y;
            break;    
        }
    }

    update(deltatime) {
        // Positie van de bal wordt aangepast op basis van zijn velocity
        this.ball.position.x += this.ball.velocity.x * deltatime; 
        this.ball.position.y += this.ball.velocity.y * deltatime;

        // Positie van de spelers wordt aangepast op basis van zijn velocity
        this.players[0].position.y += this.players[0].velocity.y * deltatime; 
        this.players[1].position.y += this.players[1].velocity.y * deltatime;

        // Roep voor beide spelers de functie aan die de input van de speler gaat checken
        this.players.forEach(player => this.checkInput(player, this.ball));

        this.checkCollisions(this.players, this.ball, this.hud.edges, deltatime);
    }

    checkCollisions(players, ball, edges, deltatime) {
        // Controleer of de bedjes van speler1 en speler2 tegen de randen aankomen
        for(let p=0; p<players.length; p++) {
            if(players[p].top < edges[0].bottom) {
                players[p].position.y = edges[0].size.y + (players[p].size.y/2);
            }else if(players[p].bottom > edges[1].top) {
                players[p].position.y = this.canvas.height - edges[1].size.y - (players[p].size.y/2);
            }
        }

        // Controleer of de bal de onderkant of de bovenkant raakt
        if(this.ball.bottom > this.canvas.height-10 || this.ball.top < 10) {
            this.ball.velocity.y = -this.ball.velocity.y; 
        }

        // Check of de bal een bedje van een speler raakt

        // hier collision script maken //

        if(this.collide(ball, players[0], deltatime)) {
            alert('bots!');
        }


        //
    }

    collide(rect1, rect2, dt) {
        if (rect1.left   + rect1.velocity.x * dt < rect2.right  + rect2.velocity.x * dt &&
            rect1.right  + rect1.velocity.x * dt > rect2.left   + rect2.velocity.x * dt &&
            rect1.top    + rect1.velocity.y * dt < rect2.bottom + rect2.velocity.y * dt &&
            rect1.bottom + rect1.velocity.y * dt > rect2.top    + rect2.velocity.y * dt) {
            return true;
        }else{
            return false;
        }
    }

    draw() {
        // Maak de context van canvas leeg en verwijder de pixels
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Teken de bal
        this.drawRectangle(this.context, this.ball);
        // Teken de spelers 
        for(let i=0; i<this.players.length; i++) {
            this.drawRectangle(this.context, this.players[i]);
        } 
    }

    drawRectangle(ctx, rect, color='white') {
        // Stel de kleur in waarmee we willen tekenen
        ctx.fillStyle = color;
        // Teken een rechthoek op de canvas
        ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
}